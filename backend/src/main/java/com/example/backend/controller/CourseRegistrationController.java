package com.example.backend.controller;

import com.example.backend.dto.request.RegistrationRequest;
import com.example.backend.dto.response.EnrollmentResponse;
import com.example.backend.service.CourseRegistrationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CourseRegistrationController {

    private final CourseRegistrationService courseRegistrationService;

    @PostMapping("/api/student/registrations")
    public ResponseEntity<EnrollmentResponse> register(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody RegistrationRequest request) {
        return ResponseEntity.ok(courseRegistrationService.register(userDetails.getUsername(), request));
    }

    @GetMapping("/api/student/registrations")
    public ResponseEntity<List<EnrollmentResponse>> getMyRegistrations(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(courseRegistrationService.getMyRegistrations(userDetails.getUsername()));
    }

    @DeleteMapping("/api/student/registrations/{enrollmentId:\\d+}")
    public ResponseEntity<Void> cancelRegistration(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Integer enrollmentId) {
        courseRegistrationService.cancelRegistration(userDetails.getUsername(), enrollmentId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/api/admin/registrations")
    public ResponseEntity<List<EnrollmentResponse>> getAllEnrollments() {
        return ResponseEntity.ok(courseRegistrationService.getAllEnrollments());
    }

    @GetMapping("/api/admin/registrations/sections/{sectionId:\\d+}")
    public ResponseEntity<List<EnrollmentResponse>> getEnrollmentsBySection(@PathVariable Integer sectionId) {
        return ResponseEntity.ok(courseRegistrationService.getEnrollmentsBySection(sectionId));
    }

    @GetMapping("/api/admin/registrations/students/{studentId:\\d+}")
    public ResponseEntity<List<EnrollmentResponse>> getEnrollmentsByStudent(@PathVariable Integer studentId) {
        return ResponseEntity.ok(courseRegistrationService.getEnrollmentsByStudent(studentId));
    }
}