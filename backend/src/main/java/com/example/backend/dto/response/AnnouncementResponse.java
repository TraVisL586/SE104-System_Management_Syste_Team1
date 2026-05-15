package com.example.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AnnouncementResponse {
    private Integer id;

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
    private Integer recipientCount;
    private LocalDateTime createdAt;
}
