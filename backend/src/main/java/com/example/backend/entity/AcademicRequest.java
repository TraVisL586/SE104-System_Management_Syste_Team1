package com.example.backend.entity;

import com.example.backend.constant.AcademicRequestStatus;
import com.example.backend.constant.AcademicRequestType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "academic_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AcademicRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "advisor_id")
    private AcademicAdvisor advisor;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AcademicRequestType type;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 1000)
    private String content;

    @Column(name = "attachment_url", length = 500)
    private String attachmentUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AcademicRequestStatus status = AcademicRequestStatus.PENDING;

    @Column(name = "advisor_note", length = 500)
    private String advisorNote;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "reviewed_at")
    private LocalDateTime reviewedAt;
}