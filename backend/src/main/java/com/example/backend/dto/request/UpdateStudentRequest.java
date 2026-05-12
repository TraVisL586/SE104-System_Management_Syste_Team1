package com.example.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter @Setter
public class UpdateStudentRequest {
    @Email(message = "Email is invalid")
    private String email;

    @NotBlank(message = "Full name is required")
    private String fullName;
    private String phone;
    private LocalDate dateOfBirth;
    private Boolean isActive;
}