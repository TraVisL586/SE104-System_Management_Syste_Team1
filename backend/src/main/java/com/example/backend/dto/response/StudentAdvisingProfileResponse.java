package com.example.backend.dto.response;

import com.example.backend.constant.StudentAcademicStatus;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class StudentAdvisingProfileResponse {
    private Integer studentId;
    private String studentCode;
    private String fullName;
    private String email;
    private String phone;
    private StudentAcademicStatus academicStatus;

    private Integer passedCredits;
    private BigDecimal gpa;
    private Integer failedCourses;
}