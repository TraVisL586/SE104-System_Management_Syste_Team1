package com.example.backend.dto.response;

import com.example.backend.constant.CourseSectionStatus;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ClassRosterResponse {
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
    private CourseSectionStatus status;

    private List<RosterStudentResponse> students;
}