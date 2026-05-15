package com.example.backend.repository;

import com.example.backend.constant.GradeStatus;
import com.example.backend.entity.EnrollmentGrade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EnrollmentGradeRepository extends JpaRepository<EnrollmentGrade, Integer> {
    Optional<EnrollmentGrade> findByEnrollmentId(Integer enrollmentId);

    List<EnrollmentGrade> findByEnrollmentCourseSectionId(Integer courseSectionId);

    List<EnrollmentGrade> findByEnrollmentStudentIdAndStatus(Integer studentId, GradeStatus status);
}