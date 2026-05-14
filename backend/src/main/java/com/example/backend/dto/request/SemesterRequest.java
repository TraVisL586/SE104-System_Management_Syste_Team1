package com.example.backend.dto.request;

import com.example.backend.constant.SemesterStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class SemesterRequest {

    @NotBlank(message = "Semester code is required")
    @Size(max = 50, message = "Semester code must not exceed 50 characters")
    private String code;

    @NotBlank(message = "Semester name is required")
    private String name;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    private LocalDate endDate;

    private LocalDate examStartDate;

    private LocalDate examEndDate;

    private SemesterStatus status;
}