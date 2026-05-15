package com.example.backend.entity;

import com.example.backend.constant.PaymentProvider;
import com.example.backend.constant.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payment_transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "transaction_code", nullable = false, unique = true, length = 100)
    private String transactionCode;

    @ManyToOne
    @JoinColumn(name = "tuition_record_id", nullable = false)
    private TuitionRecord tuitionRecord;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentProvider provider = PaymentProvider.MOCK;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus status = PaymentStatus.PENDING;

    @Column(name = "payment_url", length = 500)
    private String paymentUrl;

    @Column(name = "provider_reference", length = 255)
    private String providerReference;

    @Column(name = "failure_reason", length = 500)
    private String failureReason;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
}
