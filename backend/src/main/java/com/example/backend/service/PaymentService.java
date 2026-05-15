package com.example.backend.service;

import com.example.backend.constant.PaymentProvider;
import com.example.backend.constant.PaymentStatus;
import com.example.backend.constant.TuitionStatus;
import com.example.backend.dto.request.PaymentRequest;
import com.example.backend.dto.response.PaymentResponse;
import com.example.backend.entity.PaymentTransaction;
import com.example.backend.entity.Student;
import com.example.backend.entity.TuitionRecord;
import com.example.backend.entity.User;
import com.example.backend.repository.PaymentTransactionRepository;
import com.example.backend.repository.StudentRepository;
import com.example.backend.repository.TuitionRecordRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentTransactionRepository paymentTransactionRepository;
    private final TuitionRecordRepository tuitionRecordRepository;
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;

    @Transactional
    public PaymentResponse createPayment(String username, PaymentRequest request) {
        Student student = findStudentByUsername(username);
        TuitionRecord tuitionRecord = findTuitionRecord(request.getTuitionRecordId());

        if (!tuitionRecord.getStudent().getId().equals(student.getId())) {
            throw new RuntimeException("Tuition record does not belong to current student");
        }

        validateCanCreatePayment(tuitionRecord, request.getAmount());

        if (paymentTransactionRepository.existsByTuitionRecordIdAndStatus(
                tuitionRecord.getId(),
                PaymentStatus.PENDING
        )) {
            throw new RuntimeException("A pending payment already exists for this tuition record");
        }

        PaymentTransaction transaction = new PaymentTransaction();
        transaction.setTransactionCode(generateTransactionCode());
        transaction.setTuitionRecord(tuitionRecord);
        transaction.setStudent(student);
        transaction.setAmount(request.getAmount());
        transaction.setProvider(request.getProvider() != null ? request.getProvider() : PaymentProvider.MOCK);
        transaction.setStatus(PaymentStatus.PENDING);
        paymentTransactionRepository.save(transaction);

        transaction.setPaymentUrl("/api/payments/mock-webhook");
        transaction.setUpdatedAt(LocalDateTime.now());
        paymentTransactionRepository.save(transaction);

        return mapToResponse(transaction);
    }

    public List<PaymentResponse> getMyPayments(String username) {
        Student student = findStudentByUsername(username);

        return paymentTransactionRepository.findByStudentIdOrderByCreatedAtDesc(student.getId()).stream()
                .map(this::mapToResponse)
                .toList();
    }

    public PaymentResponse getMyPayment(String username, Integer paymentId) {
        Student student = findStudentByUsername(username);

        PaymentTransaction transaction = paymentTransactionRepository.findByIdAndStudentId(paymentId, student.getId())
                .orElseThrow(() -> new RuntimeException("Payment transaction not found"));

        return mapToResponse(transaction);
    }

    @Transactional
    public PaymentResponse mockConfirmMyPayment(
            String username,
            Integer paymentId,
            PaymentRequest.MockConfirm request) {
        Student student = findStudentByUsername(username);

        PaymentTransaction transaction = paymentTransactionRepository.findByIdAndStudentId(paymentId, student.getId())
                .orElseThrow(() -> new RuntimeException("Payment transaction not found"));

        return confirmPayment(transaction, request.getSuccess(), request.getProviderReference(), request.getFailureReason());
    }

    @Transactional
    public PaymentResponse mockWebhook(PaymentRequest.MockWebhook request) {
        PaymentTransaction transaction = paymentTransactionRepository
                .findByTransactionCode(request.getTransactionCode())
                .orElseThrow(() -> new RuntimeException("Payment transaction not found"));

        return confirmPayment(transaction, request.getSuccess(), request.getProviderReference(), request.getFailureReason());
    }

    @Transactional
    public PaymentResponse cancelMyPayment(String username, Integer paymentId) {
        Student student = findStudentByUsername(username);

        PaymentTransaction transaction = paymentTransactionRepository.findByIdAndStudentId(paymentId, student.getId())
                .orElseThrow(() -> new RuntimeException("Payment transaction not found"));

        if (transaction.getStatus() != PaymentStatus.PENDING) {
            throw new RuntimeException("Only pending payment can be cancelled");
        }

        transaction.setStatus(PaymentStatus.CANCELLED);
        transaction.setUpdatedAt(LocalDateTime.now());
        paymentTransactionRepository.save(transaction);

        return mapToResponse(transaction);
    }

    public List<PaymentResponse> getAllPayments() {
        return paymentTransactionRepository.findAll().stream()
                .map(this::mapToResponse)
                .toList();
    }

    public PaymentResponse getPaymentById(Integer paymentId) {
        return mapToResponse(findPayment(paymentId));
    }

    public List<PaymentResponse> getPaymentsByStudent(Integer studentId) {
        findStudent(studentId);

        return paymentTransactionRepository.findByStudentIdOrderByCreatedAtDesc(studentId).stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<PaymentResponse> getPaymentsByTuitionRecord(Integer tuitionRecordId) {
        findTuitionRecord(tuitionRecordId);

        return paymentTransactionRepository.findByTuitionRecordIdOrderByCreatedAtDesc(tuitionRecordId).stream()
                .map(this::mapToResponse)
                .toList();
    }

    private PaymentResponse confirmPayment(
            PaymentTransaction transaction,
            Boolean success,
            String providerReference,
            String failureReason) {
        if (transaction.getStatus() != PaymentStatus.PENDING) {
            throw new RuntimeException("Payment transaction is not pending");
        }

        if (Boolean.TRUE.equals(success)) {
            applySuccessfulPayment(transaction, providerReference);
        } else {
            transaction.setStatus(PaymentStatus.FAILED);
            transaction.setFailureReason(failureReason != null && !failureReason.isBlank()
                    ? failureReason
                    : "Payment failed");
            transaction.setProviderReference(providerReference);
            transaction.setCompletedAt(LocalDateTime.now());
            transaction.setUpdatedAt(LocalDateTime.now());
            paymentTransactionRepository.save(transaction);
        }

        return mapToResponse(transaction);
    }

    private void applySuccessfulPayment(PaymentTransaction transaction, String providerReference) {
        TuitionRecord tuitionRecord = transaction.getTuitionRecord();
        BigDecimal newPaidAmount = tuitionRecord.getPaidAmount().add(transaction.getAmount());

        if (newPaidAmount.compareTo(tuitionRecord.getTotalAmount()) > 0) {
            throw new RuntimeException("Payment amount exceeds outstanding tuition");
        }

        tuitionRecord.setPaidAmount(newPaidAmount);
        tuitionRecord.setStatus(resolveTuitionStatus(tuitionRecord.getTotalAmount(), newPaidAmount));
        tuitionRecord.setUpdatedAt(LocalDateTime.now());
        tuitionRecordRepository.save(tuitionRecord);

        transaction.setStatus(PaymentStatus.SUCCESS);
        transaction.setProviderReference(providerReference != null && !providerReference.isBlank()
                ? providerReference
                : "MOCK-" + transaction.getTransactionCode());
        transaction.setFailureReason(null);
        transaction.setCompletedAt(LocalDateTime.now());
        transaction.setUpdatedAt(LocalDateTime.now());
        paymentTransactionRepository.save(transaction);
    }

    private void validateCanCreatePayment(TuitionRecord tuitionRecord, BigDecimal amount) {
        if (tuitionRecord.getStatus() == TuitionStatus.PAID || tuitionRecord.getStatus() == TuitionStatus.WAIVED) {
            throw new RuntimeException("Tuition record has no outstanding balance");
        }

        BigDecimal outstandingAmount = getOutstandingAmount(tuitionRecord);

        if (outstandingAmount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Tuition record has no outstanding balance");
        }

        if (amount.compareTo(outstandingAmount) > 0) {
            throw new RuntimeException("Payment amount cannot exceed outstanding tuition");
        }
    }

    private TuitionStatus resolveTuitionStatus(BigDecimal totalAmount, BigDecimal paidAmount) {
        if (paidAmount.compareTo(totalAmount) >= 0) {
            return TuitionStatus.PAID;
        }

        if (paidAmount.compareTo(BigDecimal.ZERO) > 0) {
            return TuitionStatus.PARTIAL;
        }

        return TuitionStatus.OWED;
    }

    private String generateTransactionCode() {
        String code;

        do {
            code = "PAY-" + UUID.randomUUID();
        } while (paymentTransactionRepository.existsByTransactionCode(code));

        return code;
    }

    private PaymentTransaction findPayment(Integer id) {
        return paymentTransactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment transaction not found"));
    }

    private TuitionRecord findTuitionRecord(Integer id) {
        return tuitionRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tuition record not found"));
    }

    private Student findStudent(Integer id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    private Student findStudentByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return studentRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    private BigDecimal getOutstandingAmount(TuitionRecord tuitionRecord) {
        return tuitionRecord.getTotalAmount().subtract(tuitionRecord.getPaidAmount());
    }

    private PaymentResponse mapToResponse(PaymentTransaction transaction) {
        TuitionRecord tuitionRecord = transaction.getTuitionRecord();
        Student student = transaction.getStudent();

        PaymentResponse response = new PaymentResponse();
        response.setId(transaction.getId());
        response.setTransactionCode(transaction.getTransactionCode());

        response.setTuitionRecordId(tuitionRecord.getId());
        response.setStudentId(student.getId());
        response.setStudentCode(student.getStudentCode());
        response.setStudentName(student.getFullName());

        response.setSemesterId(tuitionRecord.getSemester().getId());
        response.setSemesterCode(tuitionRecord.getSemester().getCode());
        response.setSemesterName(tuitionRecord.getSemester().getName());

        response.setAmount(transaction.getAmount());
        response.setProvider(transaction.getProvider());
        response.setStatus(transaction.getStatus());
        response.setPaymentUrl(transaction.getPaymentUrl());
        response.setProviderReference(transaction.getProviderReference());
        response.setFailureReason(transaction.getFailureReason());

        response.setTuitionTotalAmount(tuitionRecord.getTotalAmount());
        response.setTuitionPaidAmount(tuitionRecord.getPaidAmount());
        response.setTuitionOutstandingAmount(getOutstandingAmount(tuitionRecord));
        response.setTuitionStatus(tuitionRecord.getStatus());

        response.setCreatedAt(transaction.getCreatedAt());
        response.setCompletedAt(transaction.getCompletedAt());
        response.setUpdatedAt(transaction.getUpdatedAt());

        return response;
    }
}
