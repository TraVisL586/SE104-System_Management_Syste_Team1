package com.example.backend.dto.response;

import com.example.backend.constant.AttendanceStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class AttendanceResponse {
    private Integer id;

    private Integer courseSectionId;
    private String courseSectionCode;

    private Integer courseId;
    private String courseCode;
    private String courseName;

    private Integer studentId;
    private String studentCode;
    private String studentName;
    private String studentEmail;

    private LocalDate attendanceDate;
    private AttendanceStatus status;
    private String note;

    private String recordedByUsername;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Getter
    @Setter
    public static class Session {
        private Integer courseSectionId;
        private String courseSectionCode;

        private Integer courseId;
        private String courseCode;
        private String courseName;

        private Integer lecturerId;
        private String lecturerCode;
        private String lecturerName;

        private Integer semesterId;
        private String semesterCode;
        private String semesterName;

        private LocalDate attendanceDate;
        private Integer totalStudents;
        private Integer presentCount;
        private Integer absentCount;
        private Integer lateCount;
        private Integer excusedCount;

        private List<AttendanceResponse> records;
    }
}
