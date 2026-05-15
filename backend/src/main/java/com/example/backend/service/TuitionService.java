package com.example.backend.service;

import com.example.backend.constant.TuitionStatus;
import com.example.backend.dto.request.TuitionRequest;
import com.example.backend.dto.response.TuitionResponse;
import com.example.backend.entity.Semester;
import com.example.backend.entity.Student;
import com.example.backend.entity.TuitionRecord;
import com.example.backend.entity.User;
import com.example.backend.repository.SemesterRepository;
import com.example.backend.repository.StudentRepository;
import com.example.backend.repository.TuitionRecordRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TuitionService {
    private final TuitionRecordRepository tuitionRecordRepository;
    private final StudentRepository studentRepository;
    private final SemesterRepository semesterRepository;
    private final UserRepository userRepository;

    @Transactional
    public TuitionResponse create(TuitionRequest request) {
        if (tuitionRecordRepository.existsByStudentIdAndSemesterId(request.getStudentId(), request.getSemesterId())) {
            throw new RuntimeException("Tuition record already exists for this student and semester");
        }

        TuitionRecord record = new TuitionRecord();
        applyRequest(record, request);
        tuitionRecordRepository.save(record);

        return mapToResponse(record);
    }

    public List<TuitionResponse> getAll() {
        return tuitionRecordRepository.findAll().stream()
                .map(this::mapToResponse)
                .toList();
    }

    public TuitionResponse getById(Integer id) {
        return mapToResponse(findRecord(id));
    }

    public List<TuitionResponse> getByStudent(Integer studentId) {
        findStudent(studentId);

        return tuitionRecordRepository.findByStudentId(studentId).stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<TuitionResponse> getBySemester(Integer semesterId) {
        findSemester(semesterId);

        return tuitionRecordRepository.findBySemesterId(semesterId).stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<TuitionResponse> getMyTuitionRecords(String username) {
        Student student = findStudentByUsername(username);

        return tuitionRecordRepository.findByStudentId(student.getId()).stream()
                .map(this::mapToResponse)
                .toList();
    }

    public TuitionResponse getMyTuitionRecordBySemester(String username, Integer semesterId) {
        Student student = findStudentByUsername(username);

        TuitionRecord record = tuitionRecordRepository
                .findByStudentIdAndSemesterId(student.getId(), semesterId)
                .orElseThrow(() -> new RuntimeException("Tuition record not found"));

        return mapToResponse(record);
    }

    @Transactional
    public TuitionResponse update(Integer id, TuitionRequest request) {
        TuitionRecord record = findRecord(id);

        boolean changedStudentOrSemester = !record.getStudent().getId().equals(request.getStudentId())
                || !record.getSemester().getId().equals(request.getSemesterId());

        if (changedStudentOrSemester
                && tuitionRecordRepository.existsByStudentIdAndSemesterId(request.getStudentId(), request.getSemesterId())) {
            throw new RuntimeException("Tuition record already exists for this student and semester");
        }

        applyRequest(record, request);
        record.setUpdatedAt(LocalDateTime.now());
        tuitionRecordRepository.save(record);

        return mapToResponse(record);
    }

    @Transactional
    public TuitionResponse addPayment(Integer id, TuitionRequest.Payment request) {
        TuitionRecord record = findRecord(id);

        BigDecimal newPaidAmount = record.getPaidAmount().add(request.getAmount());
        validateAmounts(record.getTotalAmount(), newPaidAmount);

        record.setPaidAmount(newPaidAmount);
        record.setStatus(resolveStatus(record.getTotalAmount(), newPaidAmount, null));

        if (request.getNote() != null && !request.getNote().isBlank()) {
            record.setNote(request.getNote());
        }

        record.setUpdatedAt(LocalDateTime.now());
        tuitionRecordRepository.save(record);

        return mapToResponse(record);
    }

    @Transactional
    public void delete(Integer id) {
        tuitionRecordRepository.delete(findRecord(id));
    }

    private void applyRequest(TuitionRecord record, TuitionRequest request) {
        Student student = findStudent(request.getStudentId());
        Semester semester = findSemester(request.getSemesterId());

        BigDecimal totalAmount = request.getTotalAmount();
        BigDecimal paidAmount = request.getPaidAmount() != null ? request.getPaidAmount() : BigDecimal.ZERO;

        validateAmounts(totalAmount, paidAmount);

        record.setStudent(student);
        record.setSemester(semester);
        record.setTotalAmount(totalAmount);
        record.setPaidAmount(paidAmount);
        record.setStatus(resolveStatus(totalAmount, paidAmount, request.getStatus()));
        record.setDueDate(request.getDueDate());
        record.setNote(request.getNote());
    }

    private void validateAmounts(BigDecimal totalAmount, BigDecimal paidAmount) {
        if (totalAmount == null) {
            throw new RuntimeException("Total amount is required");
        }

        if (paidAmount == null) {
            throw new RuntimeException("Paid amount is required");
        }

        if (paidAmount.compareTo(totalAmount) > 0) {
            throw new RuntimeException("Paid amount cannot be greater than total amount");
        }
    }

    private TuitionStatus resolveStatus(BigDecimal totalAmount, BigDecimal paidAmount, TuitionStatus requestedStatus) {
        if (requestedStatus == TuitionStatus.WAIVED) {
            return TuitionStatus.WAIVED;
        }

        if (totalAmount.subtract(paidAmount).compareTo(BigDecimal.ZERO) == 0) {
            return TuitionStatus.PAID;
        }

        if (paidAmount.compareTo(BigDecimal.ZERO) > 0) {
            return TuitionStatus.PARTIAL;
        }

        return TuitionStatus.OWED;
    }

    private TuitionRecord findRecord(Integer id) {
        return tuitionRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tuition record not found"));
    }

    private Student findStudent(Integer id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    private Semester findSemester(Integer id) {
        return semesterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Semester not found"));
    }

    private Student findStudentByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return studentRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    private TuitionResponse mapToResponse(TuitionRecord record) {
        TuitionResponse response = new TuitionResponse();

        response.setId(record.getId());

        response.setStudentId(record.getStudent().getId());
        response.setStudentCode(record.getStudent().getStudentCode());
        response.setStudentName(record.getStudent().getFullName());
        response.setStudentEmail(record.getStudent().getEmail());

        response.setSemesterId(record.getSemester().getId());
        response.setSemesterCode(record.getSemester().getCode());
        response.setSemesterName(record.getSemester().getName());

        response.setTotalAmount(record.getTotalAmount());
        response.setPaidAmount(record.getPaidAmount());
        response.setOutstandingAmount(record.getTotalAmount().subtract(record.getPaidAmount()));
        response.setStatus(record.getStatus());
        response.setDueDate(record.getDueDate());
        response.setNote(record.getNote());

        response.setCreatedAt(record.getCreatedAt());
        response.setUpdatedAt(record.getUpdatedAt());

        return response;
    }
}
