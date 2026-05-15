package com.example.backend.dto.request;

import com.example.backend.constant.TuitionStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class TuitionRequest {
    @NotNull(message = "Student id is required")
    private Integer studentId;

    @NotNull(message = "Semester id is required")
    private Integer semesterId;

    @NotNull(message = "Total amount is required")
    @DecimalMin(value = "0.00", message = "Total amount must be at least 0")
    private BigDecimal totalAmount;

    @DecimalMin(value = "0.00", message = "Paid amount must be at least 0")
    private BigDecimal paidAmount;

    private TuitionStatus status;

    private LocalDate dueDate;

    @Size(max = 500, message = "Note must not exceed 500 characters")
    private String note;

    @Getter
    @Setter
    public static class Payment {
        @NotNull(message = "Payment amount is required")
        @DecimalMin(value = "0.01", message = "Payment amount must be greater than 0")
        private BigDecimal amount;

        @Size(max = 500, message = "Note must not exceed 500 characters")
        private String note;
    }
}
