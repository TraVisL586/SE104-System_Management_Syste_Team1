package com.example.backend.entity;

import com.example.backend.constant.EnrollmentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "enrollments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "course_section_id", nullable = false)
    private CourseSection courseSection;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EnrollmentStatus status = EnrollmentStatus.ENROLLED;

    @Column(name = "enrolled_at", updatable = false)
    private LocalDateTime enrolledAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
}