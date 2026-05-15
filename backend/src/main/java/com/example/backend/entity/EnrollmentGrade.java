package com.example.backend.entity;

import com.example.backend.constant.GradeStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "enrollment_grades")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EnrollmentGrade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "enrollment_id", nullable = false, unique = true)
    private Enrollment enrollment;

    @Column(name = "process_score")
    private BigDecimal processScore;

    @Column(name = "midterm_score")
    private BigDecimal midtermScore;

    @Column(name = "final_score")
    private BigDecimal finalScore;

    @Column(name = "total_score")
    private BigDecimal totalScore;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GradeStatus status = GradeStatus.DRAFT;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
}