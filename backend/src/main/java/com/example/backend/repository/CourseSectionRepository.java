package com.example.backend.repository;

import com.example.backend.constant.CourseSectionStatus;
import com.example.backend.entity.CourseSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseSectionRepository extends JpaRepository<CourseSection, Integer> {
    boolean existsByCode(String code);

    List<CourseSection> findBySemesterId(Integer semesterId);

    List<CourseSection> findByCourseId(Integer courseId);

    List<CourseSection> findByLecturerId(Integer lecturerId);

    @Query("""
        SELECT cs
        FROM CourseSection cs
        WHERE cs.status = :status
          AND (:semesterId IS NULL OR cs.semester.id = :semesterId)
          AND (
                LOWER(cs.code) LIKE LOWER(CONCAT('%', :keyword, '%'))
                OR LOWER(cs.course.code) LIKE LOWER(CONCAT('%', :keyword, '%'))
                OR LOWER(cs.course.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
          )
        ORDER BY cs.course.code ASC, cs.code ASC
        """)
    List<CourseSection> searchOpenSections(
            @Param("status") CourseSectionStatus status,
            @Param("semesterId") Integer semesterId,
            @Param("keyword") String keyword
    );
}