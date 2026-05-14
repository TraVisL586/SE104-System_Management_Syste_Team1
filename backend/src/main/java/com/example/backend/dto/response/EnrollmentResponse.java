package com.example.backend.dto.response;

import com.example.backend.constant.EnrollmentStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class EnrollmentResponse {
    private Integer id;

    private Integer studentId;
    private String studentCode;
    private String studentName;

    private Integer courseSectionId;
    private String courseSectionCode;

    private Integer courseId;
    private String courseCode;
    private String courseName;
    private Integer credits;

    private Integer semesterId;
    private String semesterCode;
    private String semesterName;

    private EnrollmentStatus status;
    private LocalDateTime enrolledAt;
    private LocalDateTime updatedAt;
}