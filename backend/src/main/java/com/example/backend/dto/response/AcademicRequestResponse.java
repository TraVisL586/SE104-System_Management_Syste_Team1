package com.example.backend.dto.response;

import com.example.backend.constant.AcademicRequestStatus;
import com.example.backend.constant.AcademicRequestType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AcademicRequestResponse {
    private Integer id;

    private Integer studentId;
    private String studentCode;
    private String studentName;

    private Integer advisorId;
    private String advisorCode;
    private String advisorName;

    private AcademicRequestType type;
    private String title;
    private String content;
    private String attachmentUrl;

    private AcademicRequestStatus status;
    private String advisorNote;
    private LocalDateTime createdAt;
    private LocalDateTime reviewedAt;
}