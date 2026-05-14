package com.example.backend.repository;

import com.example.backend.constant.EnrollmentStatus;
import com.example.backend.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {
    List<Enrollment> findByStudentId(Integer studentId);

    List<Enrollment> findByCourseSectionId(Integer courseSectionId);

    List<Enrollment> findByStudentIdAndStatus(Integer studentId, EnrollmentStatus status);

    List<Enrollment> findByStudentIdAndCourseSectionSemesterIdAndStatus(
            Integer studentId,
            Integer semesterId,
            EnrollmentStatus status
    );

    Optional<Enrollment> findByStudentIdAndCourseSectionId(Integer studentId, Integer courseSectionId);

    boolean existsByStudentIdAndCourseSectionIdAndStatusIn(
            Integer studentId,
            Integer courseSectionId,
            Collection<EnrollmentStatus> statuses
    );

    boolean existsByStudentIdAndCourseSectionCourseIdAndCourseSectionSemesterIdAndStatusIn(
            Integer studentId,
            Integer courseId,
            Integer semesterId,
            Collection<EnrollmentStatus> statuses
    );

    boolean existsByStudentIdAndCourseSectionCourseIdAndStatus(
            Integer studentId,
            Integer courseId,
            EnrollmentStatus status
    );
}