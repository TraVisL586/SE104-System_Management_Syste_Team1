package com.example.backend.controller;

import com.example.backend.dto.request.TuitionRequest;
import com.example.backend.dto.response.TuitionResponse;
import com.example.backend.service.TuitionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TuitionController {
    private final TuitionService tuitionService;

    @PostMapping("/api/admin/tuition-records")
    public ResponseEntity<TuitionResponse> createTuitionRecord(@Valid @RequestBody TuitionRequest request) {
        return ResponseEntity.ok(tuitionService.create(request));
    }

    @GetMapping("/api/admin/tuition-records")
    public ResponseEntity<List<TuitionResponse>> getTuitionRecords() {
        return ResponseEntity.ok(tuitionService.getAll());
    }

    @GetMapping("/api/admin/tuition-records/{id:\\d+}")
    public ResponseEntity<TuitionResponse> getTuitionRecord(@PathVariable Integer id) {
        return ResponseEntity.ok(tuitionService.getById(id));
    }

    @GetMapping("/api/admin/tuition-records/students/{studentId:\\d+}")
    public ResponseEntity<List<TuitionResponse>> getTuitionRecordsByStudent(@PathVariable Integer studentId) {
        return ResponseEntity.ok(tuitionService.getByStudent(studentId));
    }

    @GetMapping("/api/admin/tuition-records/semesters/{semesterId:\\d+}")
    public ResponseEntity<List<TuitionResponse>> getTuitionRecordsBySemester(@PathVariable Integer semesterId) {
        return ResponseEntity.ok(tuitionService.getBySemester(semesterId));
    }

    @PutMapping("/api/admin/tuition-records/{id:\\d+}")
    public ResponseEntity<TuitionResponse> updateTuitionRecord(
            @PathVariable Integer id,
            @Valid @RequestBody TuitionRequest request) {
        return ResponseEntity.ok(tuitionService.update(id, request));
    }

    @PatchMapping("/api/admin/tuition-records/{id:\\d+}/payments")
    public ResponseEntity<TuitionResponse> addTuitionPayment(
            @PathVariable Integer id,
            @Valid @RequestBody TuitionRequest.Payment request) {
        return ResponseEntity.ok(tuitionService.addPayment(id, request));
    }

    @DeleteMapping("/api/admin/tuition-records/{id:\\d+}")
    public ResponseEntity<Void> deleteTuitionRecord(@PathVariable Integer id) {
        tuitionService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/api/student/tuition-records")
    public ResponseEntity<List<TuitionResponse>> getMyTuitionRecords(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(tuitionService.getMyTuitionRecords(userDetails.getUsername()));
    }

    @GetMapping("/api/student/tuition-records/semesters/{semesterId:\\d+}")
    public ResponseEntity<TuitionResponse> getMyTuitionRecordBySemester(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Integer semesterId) {
        return ResponseEntity.ok(tuitionService.getMyTuitionRecordBySemester(
                userDetails.getUsername(),
                semesterId
        ));
    }
}
