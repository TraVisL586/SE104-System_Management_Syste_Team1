package com.example.backend.repository;

import com.example.backend.entity.CourseSection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseSectionRepository extends JpaRepository<CourseSection, Integer> {
    boolean existsByCode(String code);

    List<CourseSection> findBySemesterId(Integer semesterId);

    List<CourseSection> findByCourseId(Integer courseId);

    List<CourseSection> findByLecturerId(Integer lecturerId);
}