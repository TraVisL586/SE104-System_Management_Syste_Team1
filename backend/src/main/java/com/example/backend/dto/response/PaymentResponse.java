package com.example.backend.dto.response;

import com.example.backend.constant.PaymentProvider;
import com.example.backend.constant.PaymentStatus;
import com.example.backend.constant.TuitionStatus;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class PaymentResponse {
    private Integer id;
    private String transactionCode;

    private Integer tuitionRecordId;
    private Integer studentId;
    private String studentCode;
    private String studentName;

    private Integer semesterId;
    private String semesterCode;
    private String semesterName;

    private BigDecimal amount;
    private PaymentProvider provider;
    private PaymentStatus status;
    private String paymentUrl;
    private String providerReference;
    private String failureReason;

    private BigDecimal tuitionTotalAmount;
    private BigDecimal tuitionPaidAmount;
    private BigDecimal tuitionOutstandingAmount;
    private TuitionStatus tuitionStatus;

    private LocalDateTime createdAt;
    private LocalDateTime completedAt;
    private LocalDateTime updatedAt;
}
