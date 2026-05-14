package com.example.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class DepartmentResponse {
    private Integer id;
    private String code;
    private String name;
    private String description;
    private LocalDateTime createdAt;
}