package com.example.backend.controller;

import com.example.backend.dto.request.CourseSectionRequest;
import com.example.backend.dto.request.CourseSectionScheduleRequest;
import com.example.backend.dto.request.RoomRequest;
import com.example.backend.dto.request.SemesterRequest;
import com.example.backend.dto.response.CourseSectionResponse;
import com.example.backend.dto.response.CourseSectionScheduleResponse;
import com.example.backend.dto.response.RoomResponse;
import com.example.backend.dto.response.SemesterResponse;
import com.example.backend.service.CourseSectionService;
import com.example.backend.service.RoomService;
import com.example.backend.service.SemesterService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/scheduling")
@RequiredArgsConstructor
public class CourseSectionSchedulingController {
    private final SemesterService semesterService;
    private final RoomService roomService;
    private final CourseSectionService courseSectionService;

    @PostMapping("/semesters")
    public ResponseEntity<SemesterResponse> createSemester(@Valid @RequestBody SemesterRequest request) {
        return ResponseEntity.ok(semesterService.create(request));
    }

    @GetMapping("/semesters")
    public ResponseEntity<List<SemesterResponse>> getSemesters() {
        return ResponseEntity.ok(semesterService.getAll());
    }

    @GetMapping("/semesters/{id:\\d+}")
    public ResponseEntity<SemesterResponse> getSemester(@PathVariable Integer id) {
        return ResponseEntity.ok(semesterService.getById(id));
    }

    @PutMapping("/semesters/{id:\\d+}")
    public ResponseEntity<SemesterResponse> updateSemester(
            @PathVariable Integer id,
            @Valid @RequestBody SemesterRequest request) {
        return ResponseEntity.ok(semesterService.update(id, request));
    }

    @DeleteMapping("/semesters/{id:\\d+}")
    public ResponseEntity<Void> deleteSemester(@PathVariable Integer id) {
        semesterService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/rooms")
    public ResponseEntity<RoomResponse> createRoom(@Valid @RequestBody RoomRequest request) {
        return ResponseEntity.ok(roomService.create(request));
    }

    @GetMapping("/rooms")
    public ResponseEntity<List<RoomResponse>> getRooms() {
        return ResponseEntity.ok(roomService.getAll());
    }

    @GetMapping("/rooms/{id:\\d+}")
    public ResponseEntity<RoomResponse> getRoom(@PathVariable Integer id) {
        return ResponseEntity.ok(roomService.getById(id));
    }

    @PutMapping("/rooms/{id:\\d+}")
    public ResponseEntity<RoomResponse> updateRoom(
            @PathVariable Integer id,
            @Valid @RequestBody RoomRequest request) {
        return ResponseEntity.ok(roomService.update(id, request));
    }

    @DeleteMapping("/rooms/{id:\\d+}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Integer id) {
        roomService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/course-sections")
    public ResponseEntity<CourseSectionResponse> createCourseSection(
            @Valid @RequestBody CourseSectionRequest request) {
        return ResponseEntity.ok(courseSectionService.create(request));
    }

    @GetMapping("/course-sections")
    public ResponseEntity<List<CourseSectionResponse>> getCourseSections() {
        return ResponseEntity.ok(courseSectionService.getAll());
    }

    @GetMapping("/course-sections/{id:\\d+}")
    public ResponseEntity<CourseSectionResponse> getCourseSection(@PathVariable Integer id) {
        return ResponseEntity.ok(courseSectionService.getById(id));
    }

    @PutMapping("/course-sections/{id:\\d+}")
    public ResponseEntity<CourseSectionResponse> updateCourseSection(
            @PathVariable Integer id,
            @Valid @RequestBody CourseSectionRequest request) {
        return ResponseEntity.ok(courseSectionService.update(id, request));
    }

    @DeleteMapping("/course-sections/{id:\\d+}")
    public ResponseEntity<Void> deleteCourseSection(@PathVariable Integer id) {
        courseSectionService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/course-sections/{sectionId:\\d+}/schedules")
    public ResponseEntity<CourseSectionResponse> addCourseSectionSchedule(
            @PathVariable Integer sectionId,
            @Valid @RequestBody CourseSectionScheduleRequest request) {
        return ResponseEntity.ok(courseSectionService.addSchedule(sectionId, request));
    }

    @GetMapping("/course-sections/{sectionId:\\d+}/schedules")
    public ResponseEntity<List<CourseSectionScheduleResponse>> getCourseSectionSchedules(
            @PathVariable Integer sectionId) {
        return ResponseEntity.ok(courseSectionService.getSchedules(sectionId));
    }

    @DeleteMapping("/course-sections/{sectionId:\\d+}/schedules/{scheduleId:\\d+}")
    public ResponseEntity<Void> removeCourseSectionSchedule(
            @PathVariable Integer sectionId,
            @PathVariable Integer scheduleId) {
        courseSectionService.removeSchedule(sectionId, scheduleId);
        return ResponseEntity.noContent().build();
    }
}