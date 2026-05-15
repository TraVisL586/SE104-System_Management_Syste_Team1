package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "advisor_students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@IdClass(AdvisorStudentId.class)
public class AdvisorStudent {
    @Id
    @ManyToOne
    @JoinColumn(name = "advisor_id", nullable = false)
    private AcademicAdvisor advisor;

    @Id
    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(name = "assigned_at", updatable = false)
    private LocalDateTime assignedAt = LocalDateTime.now();
}