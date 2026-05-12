package com.example.backend.dto.request;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter @Setter
public class CreateStudentRequest {
    // Thông tin User
    private String username;
    private String password;
    private String email;
    private String fullName;

    // Thông tin Student
    private String studentCode;
    private String phone;
    private LocalDate dateOfBirth;
}