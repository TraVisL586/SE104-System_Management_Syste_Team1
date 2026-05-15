package com.example.backend.dto.response;

import com.example.backend.constant.GradeStatus;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class GradeResponse {
    private Integer id;
    private Integer enrollmentId;

    private Integer studentId;
    private String studentCode;
    private String studentName;

    private Integer courseSectionId;
    private String courseSectionCode;

    private Integer courseId;
    private String courseCode;
    private String courseName;

    private BigDecimal processScore;
    private BigDecimal midtermScore;
    private BigDecimal finalScore;
    private BigDecimal totalScore;

    private GradeStatus status;
    private LocalDateTime publishedAt;
    private LocalDateTime updatedAt;
}