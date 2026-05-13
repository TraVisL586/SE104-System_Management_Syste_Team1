package com.example.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class AccountResponse {
    private Integer id;
    private String username;
    private String email;
    private String fullName;
    private Boolean isActive;
    private List<String> roles;

    private String profileType;
    private String profileCode;
    private String phone;
    private String department;

    private LocalDateTime createdAt;
}