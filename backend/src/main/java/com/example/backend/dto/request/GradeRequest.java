package com.example.backend.dto.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class GradeRequest {
    @NotNull(message = "Process score is required")
    @DecimalMin(value = "0.0", message = "Process score must be at least 0")
    @DecimalMax(value = "10.0", message = "Process score must be at most 10")
    private BigDecimal processScore;

    @NotNull(message = "Midterm score is required")
    @DecimalMin(value = "0.0", message = "Midterm score must be at least 0")
    @DecimalMax(value = "10.0", message = "Midterm score must be at most 10")
    private BigDecimal midtermScore;

    @NotNull(message = "Final score is required")
    @DecimalMin(value = "0.0", message = "Final score must be at least 0")
    @DecimalMax(value = "10.0", message = "Final score must be at most 10")
    private BigDecimal finalScore;
}