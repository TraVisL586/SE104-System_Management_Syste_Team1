package com.example.backend.repository;

import com.example.backend.constant.AcademicRequestStatus;
import com.example.backend.entity.AcademicRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AcademicRequestRepository extends JpaRepository<AcademicRequest, Integer> {
    List<AcademicRequest> findByStudentId(Integer studentId);

    List<AcademicRequest> findByAdvisorId(Integer advisorId);

    List<AcademicRequest> findByAdvisorIdAndStatus(Integer advisorId, AcademicRequestStatus status);
}