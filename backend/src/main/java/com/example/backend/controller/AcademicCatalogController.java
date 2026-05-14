package com.example.backend.controller;

import com.example.backend.dto.request.CoursePrerequisiteRequest;
import com.example.backend.dto.request.CourseRequest;
import com.example.backend.dto.request.DepartmentRequest;
import com.example.backend.dto.request.ProgramRequest;
import com.example.backend.dto.response.CourseResponse;
import com.example.backend.dto.response.DepartmentResponse;
import com.example.backend.dto.response.ProgramResponse;
import com.example.backend.service.CourseService;
import com.example.backend.service.DepartmentService;
import com.example.backend.service.ProgramService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/catalog")
@RequiredArgsConstructor
public class AcademicCatalogController {
    private final DepartmentService departmentService;
    private final ProgramService programService;
    private final CourseService courseService;

    @PostMapping("/departments")
    public ResponseEntity<DepartmentResponse> createDepartment(@Valid @RequestBody DepartmentRequest request) {
        return ResponseEntity.ok(departmentService.create(request));
    }

    @GetMapping("/departments")
    public ResponseEntity<List<DepartmentResponse>> getDepartments() {
        return ResponseEntity.ok(departmentService.getAll());
    }

    @GetMapping("/departments/{id:\\d+}")
    public ResponseEntity<DepartmentResponse> getDepartment(@PathVariable Integer id) {
        return ResponseEntity.ok(departmentService.getById(id));
    }

    @PutMapping("/departments/{id:\\d+}")
    public ResponseEntity<DepartmentResponse> updateDepartment(
            @PathVariable Integer id,
            @Valid @RequestBody DepartmentRequest request) {
        return ResponseEntity.ok(departmentService.update(id, request));
    }

    @DeleteMapping("/departments/{id:\\d+}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable Integer id) {
        departmentService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/programs")
    public ResponseEntity<ProgramResponse> createProgram(@Valid @RequestBody ProgramRequest request) {
        return ResponseEntity.ok(programService.create(request));
    }

    @GetMapping("/programs")
    public ResponseEntity<List<ProgramResponse>> getPrograms() {
        return ResponseEntity.ok(programService.getAll());
    }

    @GetMapping("/programs/{id:\\d+}")
    public ResponseEntity<ProgramResponse> getProgram(@PathVariable Integer id) {
        return ResponseEntity.ok(programService.getById(id));
    }

    @PutMapping("/programs/{id:\\d+}")
    public ResponseEntity<ProgramResponse> updateProgram(
            @PathVariable Integer id,
            @Valid @RequestBody ProgramRequest request) {
        return ResponseEntity.ok(programService.update(id, request));
    }

    @DeleteMapping("/programs/{id:\\d+}")
    public ResponseEntity<Void> deleteProgram(@PathVariable Integer id) {
        programService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/courses")
    public ResponseEntity<CourseResponse> createCourse(@Valid @RequestBody CourseRequest request) {
        return ResponseEntity.ok(courseService.create(request));
    }

    @GetMapping("/courses")
    public ResponseEntity<List<CourseResponse>> getCourses() {
        return ResponseEntity.ok(courseService.getAll());
    }

    @GetMapping("/courses/{id:\\d+}")
    public ResponseEntity<CourseResponse> getCourse(@PathVariable Integer id) {
        return ResponseEntity.ok(courseService.getById(id));
    }

    @PutMapping("/courses/{id:\\d+}")
    public ResponseEntity<CourseResponse> updateCourse(
            @PathVariable Integer id,
            @Valid @RequestBody CourseRequest request) {
        return ResponseEntity.ok(courseService.update(id, request));
    }

    @DeleteMapping("/courses/{id:\\d+}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Integer id) {
        courseService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/courses/{courseId:\\d+}/prerequisites")
    public ResponseEntity<CourseResponse> addCoursePrerequisite(
            @PathVariable Integer courseId,
            @Valid @RequestBody CoursePrerequisiteRequest request) {
        return ResponseEntity.ok(courseService.addPrerequisite(courseId, request));
    }

    @GetMapping("/courses/{courseId:\\d+}/prerequisites")
    public ResponseEntity<List<CourseResponse>> getCoursePrerequisites(@PathVariable Integer courseId) {
        return ResponseEntity.ok(courseService.getPrerequisites(courseId));
    }

    @DeleteMapping("/courses/{courseId:\\d+}/prerequisites/{prerequisiteId:\\d+}")
    public ResponseEntity<Void> removeCoursePrerequisite(
            @PathVariable Integer courseId,
            @PathVariable Integer prerequisiteId) {
        courseService.removePrerequisite(courseId, prerequisiteId);
        return ResponseEntity.noContent().build();
    }
}