package com.example.backend.dto.request;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter @Setter
public class UpdateStudentRequest {
    private String email;
    private String fullName;
    private String phone;
    private LocalDate dateOfBirth;
    private Boolean isActive;
}