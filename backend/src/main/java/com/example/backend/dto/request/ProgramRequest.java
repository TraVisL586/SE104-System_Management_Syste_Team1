package com.example.backend.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProgramRequest {

    @NotNull(message = "Department id is required")
    private Integer departmentId;

    @NotBlank(message = "Program code is required")
    @Size(max = 50, message = "Program code must not exceed 50 characters")
    private String code;

    @NotBlank(message = "Program name is required")
    private String name;

    private String degreeLevel;

    @Min(value = 1, message = "Duration years must be at least 1")
    private Integer durationYears;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;
}