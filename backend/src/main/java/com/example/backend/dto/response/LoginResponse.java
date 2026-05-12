package com.example.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class LoginResponse {
    private String token;
    private String username;
    private String email;
    private String fullName;
    private String type = "Bearer";
    private List<String> roles;

    public LoginResponse() {
    }

    public LoginResponse(String token, String username, String email, String fullName, List<String> roles) {
        this.token = token;
        this.username = username;
        this.email = email;
        this.fullName = fullName;
        this.roles = roles;
    }
}