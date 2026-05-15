package com.example.backend.controller;

import com.example.backend.dto.response.ReportResponse;
import com.example.backend.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/api/admin/reports")
@RequiredArgsConstructor
public class ReportController {
    private static final MediaType TEXT_CSV = new MediaType("text", "csv", StandardCharsets.UTF_8);

    private final ReportService reportService;

    @GetMapping("/class-fill-rates")
    public ResponseEntity<List<ReportResponse.ClassFillRate>> getClassFillRates(
            @RequestParam(required = false) Integer semesterId) {
        return ResponseEntity.ok(reportService.getClassFillRates(semesterId));
    }

    @GetMapping("/class-fill-rates/export")
    public ResponseEntity<byte[]> exportClassFillRates(
            @RequestParam(required = false) Integer semesterId) {
        return csvResponse(
                reportService.exportClassFillRatesCsv(semesterId),
                "class-fill-rates.csv"
        );
    }

    @GetMapping("/grade-progress")
    public ResponseEntity<List<ReportResponse.GradeProgress>> getGradeProgress(
            @RequestParam(required = false) Integer semesterId) {
        return ResponseEntity.ok(reportService.getGradeProgress(semesterId));
    }

    @GetMapping("/grade-progress/export")
    public ResponseEntity<byte[]> exportGradeProgress(
            @RequestParam(required = false) Integer semesterId) {
        return csvResponse(
                reportService.exportGradeProgressCsv(semesterId),
                "grade-progress.csv"
        );
    }

    @GetMapping("/student-status-summary")
    public ResponseEntity<List<ReportResponse.StudentStatusSummary>> getStudentStatusSummary() {
        return ResponseEntity.ok(reportService.getStudentStatusSummary());
    }

    @GetMapping("/student-status-summary/export")
    public ResponseEntity<byte[]> exportStudentStatusSummary() {
        return csvResponse(
                reportService.exportStudentStatusSummaryCsv(),
                "student-status-summary.csv"
        );
    }

    @GetMapping("/tuition-summary")
    public ResponseEntity<List<ReportResponse.TuitionSummary>> getTuitionSummary(
            @RequestParam(required = false) Integer semesterId) {
        return ResponseEntity.ok(reportService.getTuitionSummary(semesterId));
    }

    @GetMapping("/tuition-summary/export")
    public ResponseEntity<byte[]> exportTuitionSummary(
            @RequestParam(required = false) Integer semesterId) {
        return csvResponse(
                reportService.exportTuitionSummaryCsv(semesterId),
                "tuition-summary.csv"
        );
    }

    @GetMapping("/grade-status-summary")
    public ResponseEntity<List<ReportResponse.GradeStatusSummary>> getGradeStatusSummary() {
        return ResponseEntity.ok(reportService.getGradeStatusSummary());
    }

    private ResponseEntity<byte[]> csvResponse(String csv, String filename) {
        return ResponseEntity.ok()
                .contentType(TEXT_CSV)
                .header(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.attachment()
                        .filename(filename)
                        .build()
                        .toString())
                .body(csv.getBytes(StandardCharsets.UTF_8));
    }
}
