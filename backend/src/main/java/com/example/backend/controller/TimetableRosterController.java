package com.example.backend.controller;

import com.example.backend.dto.response.ClassRosterResponse;
import com.example.backend.dto.response.TimetableEntryResponse;
import com.example.backend.service.TimetableRosterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TimetableRosterController {

    private final TimetableRosterService timetableRosterService;

    @GetMapping("/api/student/timetable")
    public ResponseEntity<List<TimetableEntryResponse>> getMyStudentTimetable(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                timetableRosterService.getStudentTimetableByUsername(userDetails.getUsername())
        );
    }

    @GetMapping("/api/student/course-sections/{sectionId:\\d+}/roster")
    public ResponseEntity<ClassRosterResponse> getRosterForStudent(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Integer sectionId) {
        return ResponseEntity.ok(
                timetableRosterService.getRosterForStudent(userDetails.getUsername(), sectionId)
        );
    }

    @GetMapping("/api/lecturer/timetable")
    public ResponseEntity<List<TimetableEntryResponse>> getMyLecturerTimetable(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                timetableRosterService.getLecturerTimetableByUsername(userDetails.getUsername())
        );
    }

    @GetMapping("/api/lecturer/course-sections/{sectionId:\\d+}/roster")
    public ResponseEntity<ClassRosterResponse> getRosterForLecturer(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Integer sectionId) {
        return ResponseEntity.ok(
                timetableRosterService.getRosterForLecturer(userDetails.getUsername(), sectionId)
        );
    }

    @GetMapping("/api/admin/timetable/students/{studentId:\\d+}")
    public ResponseEntity<List<TimetableEntryResponse>> getStudentTimetableByAdmin(
            @PathVariable Integer studentId) {
        return ResponseEntity.ok(timetableRosterService.getStudentTimetable(studentId));
    }

    @GetMapping("/api/admin/timetable/lecturers/{lecturerId:\\d+}")
    public ResponseEntity<List<TimetableEntryResponse>> getLecturerTimetableByAdmin(
            @PathVariable Integer lecturerId) {
        return ResponseEntity.ok(timetableRosterService.getLecturerTimetable(lecturerId));
    }

    @GetMapping("/api/admin/course-sections/{sectionId:\\d+}/roster")
    public ResponseEntity<ClassRosterResponse> getRosterByAdmin(@PathVariable Integer sectionId) {
        return ResponseEntity.ok(timetableRosterService.getRoster(sectionId));
    }
}