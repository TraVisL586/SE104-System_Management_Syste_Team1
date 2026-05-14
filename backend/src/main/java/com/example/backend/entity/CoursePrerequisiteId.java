package com.example.backend.entity;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class CoursePrerequisiteId implements Serializable {
    private Integer course;
    private Integer prerequisiteCourse;
}