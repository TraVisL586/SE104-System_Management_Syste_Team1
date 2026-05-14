package com.example.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CoursePrerequisiteRequest {

    @NotNull(message = "Prerequisite course id is required")
    private Integer prerequisiteCourseId;
}