package com.example.backend.dto.response;

import com.example.backend.constant.SemesterStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class SemesterResponse {
    private Integer id;
    private String code;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate examStartDate;
    private LocalDate examEndDate;
    private SemesterStatus status;
    private LocalDateTime createdAt;
}