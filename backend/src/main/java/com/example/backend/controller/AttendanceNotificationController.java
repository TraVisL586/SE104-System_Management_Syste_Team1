package com.example.backend.controller;

import com.example.backend.dto.request.AnnouncementRequest;
import com.example.backend.dto.request.AttendanceRequest;
import com.example.backend.dto.response.AnnouncementResponse;
import com.example.backend.dto.response.AttendanceResponse;
import com.example.backend.dto.response.NotificationResponse;
import com.example.backend.service.AttendanceNotificationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class AttendanceNotificationController {
    private final AttendanceNotificationService attendanceNotificationService;

    @PutMapping("/api/lecturer/course-sections/{sectionId:\\d+}/attendance")
    public ResponseEntity<AttendanceResponse.Session> recordAttendance(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Integer sectionId,
            @Valid @RequestBody AttendanceRequest.Session request) {
        return ResponseEntity.ok(attendanceNotificationService.recordAttendance(
                userDetails.getUsername(),
                sectionId,
                request
        ));
    }

    @GetMapping("/api/lecturer/course-sections/{sectionId:\\d+}/attendance")
    public ResponseEntity<AttendanceResponse.Session> getAttendanceForLecturer(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Integer sectionId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(attendanceNotificationService.getAttendanceForLecturer(
                userDetails.getUsername(),
                sectionId,
                date
        ));
    }

    @GetMapping("/api/student/attendance")
    public ResponseEntity<List<AttendanceResponse>> getMyAttendance(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(required = false) Integer courseSectionId) {
        return ResponseEntity.ok(attendanceNotificationService.getMyAttendance(
                userDetails.getUsername(),
                courseSectionId
        ));
    }

    @GetMapping("/api/admin/course-sections/{sectionId:\\d+}/attendance")
    public ResponseEntity<AttendanceResponse.Session> getAttendanceForAdmin(
            @PathVariable Integer sectionId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(attendanceNotificationService.getAttendanceForAdmin(sectionId, date));
    }

    @PostMapping("/api/lecturer/course-sections/{sectionId:\\d+}/announcements")
    public ResponseEntity<AnnouncementResponse> createAnnouncement(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Integer sectionId,
            @Valid @RequestBody AnnouncementRequest request) {
        return ResponseEntity.ok(attendanceNotificationService.createAnnouncement(
                userDetails.getUsername(),
                sectionId,
                request
        ));
    }

    @GetMapping("/api/lecturer/course-sections/{sectionId:\\d+}/announcements")
    public ResponseEntity<List<AnnouncementResponse>> getAnnouncementsForLecturer(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Integer sectionId) {
        return ResponseEntity.ok(attendanceNotificationService.getAnnouncementsForLecturer(
                userDetails.getUsername(),
                sectionId
        ));
    }

    @GetMapping("/api/admin/course-sections/{sectionId:\\d+}/announcements")
    public ResponseEntity<List<AnnouncementResponse>> getAnnouncementsForAdmin(@PathVariable Integer sectionId) {
        return ResponseEntity.ok(attendanceNotificationService.getAnnouncementsForAdmin(sectionId));
    }

    @GetMapping("/api/student/notifications")
    public ResponseEntity<List<NotificationResponse>> getMyNotifications(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(required = false) Boolean isRead) {
        return ResponseEntity.ok(attendanceNotificationService.getMyNotifications(
                userDetails.getUsername(),
                isRead
        ));
    }

    @PatchMapping("/api/student/notifications/{notificationId:\\d+}/read")
    public ResponseEntity<NotificationResponse> markNotificationAsRead(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Integer notificationId) {
        return ResponseEntity.ok(attendanceNotificationService.markNotificationAsRead(
                userDetails.getUsername(),
                notificationId
        ));
    }

    @PatchMapping("/api/student/notifications/read-all")
    public ResponseEntity<List<NotificationResponse>> markAllNotificationsAsRead(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(attendanceNotificationService.markAllNotificationsAsRead(
                userDetails.getUsername()
        ));
    }
}
