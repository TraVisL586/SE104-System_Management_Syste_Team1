package com.example.backend.repository;

import com.example.backend.entity.AdvisorStudent;
import com.example.backend.entity.AdvisorStudentId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AdvisorStudentRepository extends JpaRepository<AdvisorStudent, AdvisorStudentId> {
    List<AdvisorStudent> findByAdvisorId(Integer advisorId);

    Optional<AdvisorStudent> findByStudentId(Integer studentId);

    boolean existsByAdvisorIdAndStudentId(Integer advisorId, Integer studentId);

    void deleteByAdvisorIdAndStudentId(Integer advisorId, Integer studentId);
}