package com.example.backend.repository;

import com.example.backend.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {
    List<Attendance> findByCourseSectionIdAndAttendanceDateOrderByStudentStudentCodeAsc(
            Integer courseSectionId,
            LocalDate attendanceDate
    );

    Optional<Attendance> findByCourseSectionIdAndStudentIdAndAttendanceDate(
            Integer courseSectionId,
            Integer studentId,
            LocalDate attendanceDate
    );

    List<Attendance> findByStudentIdOrderByAttendanceDateDesc(Integer studentId);

    List<Attendance> findByStudentIdAndCourseSectionIdOrderByAttendanceDateDesc(
            Integer studentId,
            Integer courseSectionId
    );
}
