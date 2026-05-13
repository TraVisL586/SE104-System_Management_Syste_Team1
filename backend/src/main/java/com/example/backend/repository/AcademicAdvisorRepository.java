package com.example.backend.repository;

import com.example.backend.entity.AcademicAdvisor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AcademicAdvisorRepository extends JpaRepository<AcademicAdvisor, Integer> {
    Optional<AcademicAdvisor> findByUserId(Integer userId);
    boolean existsByAdvisorCode(String advisorCode);
}