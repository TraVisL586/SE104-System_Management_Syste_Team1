package com.example.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AcademicRequestDecisionRequest {
    @NotNull(message = "Approved value is required")
    private Boolean approved;

    @Size(max = 500, message = "Advisor note must not exceed 500 characters")
    private String advisorNote;
}