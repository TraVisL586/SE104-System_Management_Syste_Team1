package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "academic_advisors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AcademicAdvisor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false, unique = true)
    private User user;

    @Column(name = "advisor_code", nullable = false, unique = true)
    private String advisorCode;

    @Column(name = "full_name")
    private String fullName;

    private String email;

    private String phone;

    private String department;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}