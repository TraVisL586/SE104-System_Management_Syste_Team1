package com.example.backend.dto.response;

import com.example.backend.constant.GradeStatus;
import com.example.backend.constant.StudentAcademicStatus;
import com.example.backend.constant.TuitionStatus;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

public class ReportResponse {

    @Getter
    @Setter
    public static class ClassFillRate {
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

        private Integer capacity;
        private Integer enrolledCount;
        private Integer availableSeats;
        private BigDecimal fillRatePercent;
    }

    @Getter
    @Setter
    public static class GradeProgress {
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

        private Integer totalStudents;
        private Integer draftGrades;
        private Integer publishedGrades;
        private Integer missingGrades;
        private BigDecimal publishRatePercent;
    }

    @Getter
    @Setter
    public static class StudentStatusSummary {
        private StudentAcademicStatus status;
        private Long studentCount;
    }

    @Getter
    @Setter
    public static class TuitionSummary {
        private TuitionStatus status;
        private Long recordCount;
        private BigDecimal totalAmount;
        private BigDecimal paidAmount;
        private BigDecimal outstandingAmount;
    }

    @Getter
    @Setter
    public static class GradeStatusSummary {
        private GradeStatus status;
        private Long gradeCount;
    }
}
