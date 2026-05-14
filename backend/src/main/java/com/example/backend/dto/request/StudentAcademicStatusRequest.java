package com.example.backend.dto.request;

import com.example.backend.constant.StudentAcademicStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentAcademicStatusRequest {

    @NotNull(message = "Academic status is required")
    private StudentAcademicStatus academicStatus;
}