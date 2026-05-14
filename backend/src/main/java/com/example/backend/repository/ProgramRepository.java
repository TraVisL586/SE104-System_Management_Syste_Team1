package com.example.backend.repository;

import com.example.backend.entity.Program;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgramRepository extends JpaRepository<Program, Integer> {
    boolean existsByCode(String code);
}