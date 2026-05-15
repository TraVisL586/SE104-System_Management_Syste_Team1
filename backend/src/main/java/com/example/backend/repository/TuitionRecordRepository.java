package com.example.backend.repository;

import com.example.backend.entity.TuitionRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TuitionRecordRepository extends JpaRepository<TuitionRecord, Integer> {
    Optional<TuitionRecord> findByStudentIdAndSemesterId(Integer studentId, Integer semesterId);

    List<TuitionRecord> findByStudentId(Integer studentId);

    List<TuitionRecord> findBySemesterId(Integer semesterId);

    boolean existsByStudentIdAndSemesterId(Integer studentId, Integer semesterId);
}
