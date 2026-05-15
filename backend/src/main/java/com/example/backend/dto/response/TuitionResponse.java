package com.example.backend.dto.response;

import com.example.backend.constant.TuitionStatus;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class TuitionResponse {
    private Integer id;

    private Integer studentId;
    private String studentCode;
    private String studentName;
    private String studentEmail;

    private Integer semesterId;
    private String semesterCode;
    private String semesterName;

    private BigDecimal totalAmount;
    private BigDecimal paidAmount;
    private BigDecimal outstandingAmount;
    private TuitionStatus status;
    private LocalDate dueDate;
    private String note;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
