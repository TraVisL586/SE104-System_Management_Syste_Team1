package com.example.backend.entity;

import com.example.backend.constant.GradeUnlockRequestStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "grade_unlock_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GradeUnlockRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "grade_id", nullable = false)
    private EnrollmentGrade grade;

    @ManyToOne
    @JoinColumn(name = "lecturer_id", nullable = false)
    private Lecturer lecturer;

    @Column(nullable = false, length = 500)
    private String reason;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GradeUnlockRequestStatus status = GradeUnlockRequestStatus.PENDING;

    @Column(name = "reviewer_note", length = 500)
    private String reviewerNote;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "reviewed_at")
    private LocalDateTime reviewedAt;
}