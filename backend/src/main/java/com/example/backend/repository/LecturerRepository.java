package com.example.backend.repository;

import com.example.backend.entity.Lecturer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LecturerRepository extends JpaRepository<Lecturer, Integer> {
    Optional<Lecturer> findByUserId(Integer userId);
    boolean existsByLecturerCode(String lecturerCode);
}
