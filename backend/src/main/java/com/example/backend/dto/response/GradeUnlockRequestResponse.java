package com.example.backend.dto.response;

import com.example.backend.constant.GradeUnlockRequestStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class GradeUnlockRequestResponse {
    private Integer id;
    private Integer gradeId;
    private Integer enrollmentId;

    private Integer lecturerId;
    private String lecturerCode;
    private String lecturerName;

    private String reason;
    private GradeUnlockRequestStatus status;
    private String reviewerNote;
    private LocalDateTime createdAt;
    private LocalDateTime reviewedAt;
}