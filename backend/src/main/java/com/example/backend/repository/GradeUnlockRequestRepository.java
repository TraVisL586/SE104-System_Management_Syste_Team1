package com.example.backend.repository;

import com.example.backend.constant.GradeUnlockRequestStatus;
import com.example.backend.entity.GradeUnlockRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GradeUnlockRequestRepository extends JpaRepository<GradeUnlockRequest, Integer> {
    List<GradeUnlockRequest> findByStatus(GradeUnlockRequestStatus status);

    boolean existsByGradeIdAndStatus(Integer gradeId, GradeUnlockRequestStatus status);
}