package com.example.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginResponse {
    private String token;
    private String username;
    private String email;
    private String fullName;
    private String type = "Bearer";

    public LoginResponse() {
    }

    public LoginResponse(String token, String username, String email, String fullName) {
        this.token = token;
        this.username = username;
        this.email = email;
        this.fullName = fullName;
    }
}