package com.example.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class NotificationResponse {
    private Integer id;

    private Integer announcementId;
    private Integer courseSectionId;
    private String courseSectionCode;

    private Integer courseId;
    private String courseCode;
    private String courseName;

    private Integer lecturerId;
    private String lecturerCode;
    private String lecturerName;

    private String title;
    private String content;
    private Boolean isRead;
    private LocalDateTime readAt;
    private LocalDateTime createdAt;
}
