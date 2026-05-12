package com.example.backend.repository;

import com.example.backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Integer> {
    Optional<Student> findByStudentCode(String studentCode);
    Optional<Student> findByUserId(Integer userId);
    boolean existsByStudentCode(String studentCode);
}