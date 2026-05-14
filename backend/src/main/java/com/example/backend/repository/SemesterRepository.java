package com.example.backend.repository;

import com.example.backend.entity.Semester;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SemesterRepository extends JpaRepository<Semester, Integer> {
    boolean existsByCode(String code);
}