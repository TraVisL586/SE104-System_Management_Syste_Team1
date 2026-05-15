package com.example.backend.entity;

import com.example.backend.constant.AttendanceStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "attendances",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_attendances_section_student_date",
                        columnNames = {"course_section_id", "student_id", "attendance_date"}
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "course_section_id", nullable = false)
    private CourseSection courseSection;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(name = "attendance_date", nullable = false)
    private LocalDate attendanceDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AttendanceStatus status;

    @Column(length = 500)
    private String note;

    @ManyToOne
    @JoinColumn(name = "recorded_by_user_id")
    private User recordedBy;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
}
