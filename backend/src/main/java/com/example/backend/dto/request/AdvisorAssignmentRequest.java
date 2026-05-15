package com.example.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdvisorAssignmentRequest {
    @NotNull(message = "Advisor id is required")
    private Integer advisorId;

    @NotNull(message = "Student id is required")
    private Integer studentId;
}