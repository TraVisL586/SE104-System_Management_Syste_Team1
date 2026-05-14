package com.example.backend.repository;

import com.example.backend.entity.CourseSectionSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalTime;
import java.util.List;

public interface CourseSectionScheduleRepository extends JpaRepository<CourseSectionSchedule, Integer> {
    List<CourseSectionSchedule> findByCourseSectionId(Integer courseSectionId);

    boolean existsByRoomIdAndDayOfWeekAndStartTimeLessThanAndEndTimeGreaterThan(
            Integer roomId,
            Integer dayOfWeek,
            LocalTime endTime,
            LocalTime startTime
    );

    boolean existsByCourseSectionLecturerIdAndDayOfWeekAndStartTimeLessThanAndEndTimeGreaterThan(
            Integer lecturerId,
            Integer dayOfWeek,
            LocalTime endTime,
            LocalTime startTime
    );
}