package com.example.backend.repository;

import com.example.backend.entity.CoursePrerequisite;
import com.example.backend.entity.CoursePrerequisiteId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CoursePrerequisiteRepository extends JpaRepository<CoursePrerequisite, CoursePrerequisiteId> {
    List<CoursePrerequisite> findByCourseId(Integer courseId);
    boolean existsByCourseIdAndPrerequisiteCourseId(Integer courseId, Integer prerequisiteCourseId);
    void deleteByCourseIdAndPrerequisiteCourseId(Integer courseId, Integer prerequisiteCourseId);
}