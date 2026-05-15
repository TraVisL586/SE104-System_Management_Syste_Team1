package com.example.backend.dto.response;

import com.example.backend.constant.StudentAcademicStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdvisorStudentResponse {
    private Integer studentId;
    private String studentCode;
    private String fullName;
    private String email;
    private String phone;
    private StudentAcademicStatus academicStatus;
}