package com.example.backend.repository;

import com.example.backend.constant.PaymentStatus;
import com.example.backend.entity.PaymentTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentTransactionRepository extends JpaRepository<PaymentTransaction, Integer> {
    List<PaymentTransaction> findByStudentIdOrderByCreatedAtDesc(Integer studentId);

    List<PaymentTransaction> findByTuitionRecordIdOrderByCreatedAtDesc(Integer tuitionRecordId);

    Optional<PaymentTransaction> findByIdAndStudentId(Integer id, Integer studentId);

    Optional<PaymentTransaction> findByTransactionCode(String transactionCode);

    boolean existsByTransactionCode(String transactionCode);

    boolean existsByTuitionRecordIdAndStatus(Integer tuitionRecordId, PaymentStatus status);
}
