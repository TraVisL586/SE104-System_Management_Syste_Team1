package com.example.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ProgramResponse {
    private Integer id;
    private String code;
    private String name;
    private String degreeLevel;
    private Integer durationYears;
    private String description;
    private Integer departmentId;
    private String departmentCode;
    private String departmentName;
    private LocalDateTime createdAt;
}