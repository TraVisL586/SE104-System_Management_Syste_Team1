package com.example.backend.service;

import com.example.backend.constant.SemesterStatus;
import com.example.backend.dto.request.SemesterRequest;
import com.example.backend.dto.response.SemesterResponse;
import com.example.backend.entity.Semester;
import com.example.backend.repository.SemesterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SemesterService {
    private final SemesterRepository semesterRepository;

    @Transactional
    public SemesterResponse create(SemesterRequest request) {
        validateDates(request);

        if (semesterRepository.existsByCode(request.getCode())) {
            throw new RuntimeException("Semester code already exists");
        }

        Semester semester = new Semester();
        applyRequest(semester, request);
        semesterRepository.save(semester);

        return mapToResponse(semester);
    }

    public List<SemesterResponse> getAll() {
        return semesterRepository.findAll().stream()
                .map(this::mapToResponse)
                .toList();
    }

    public SemesterResponse getById(Integer id) {
        return mapToResponse(findSemester(id));
    }

    @Transactional
    public SemesterResponse update(Integer id, SemesterRequest request) {
        validateDates(request);

        Semester semester = findSemester(id);

        if (!semester.getCode().equals(request.getCode())
                && semesterRepository.existsByCode(request.getCode())) {
            throw new RuntimeException("Semester code already exists");
        }

        applyRequest(semester, request);
        semesterRepository.save(semester);

        return mapToResponse(semester);
    }

    @Transactional
    public void delete(Integer id) {
        semesterRepository.delete(findSemester(id));
    }

    private Semester findSemester(Integer id) {
        return semesterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Semester not found"));
    }

    private void applyRequest(Semester semester, SemesterRequest request) {
        semester.setCode(request.getCode());
        semester.setName(request.getName());
        semester.setStartDate(request.getStartDate());
        semester.setEndDate(request.getEndDate());
        semester.setExamStartDate(request.getExamStartDate());
        semester.setExamEndDate(request.getExamEndDate());
        semester.setStatus(request.getStatus() != null ? request.getStatus() : SemesterStatus.UPCOMING);
    }

    private void validateDates(SemesterRequest request) {
        if (request.getStartDate().isAfter(request.getEndDate())) {
            throw new RuntimeException("Semester start date must be before or equal to end date");
        }

        if (request.getExamStartDate() != null
                && request.getExamEndDate() != null
                && request.getExamStartDate().isAfter(request.getExamEndDate())) {
            throw new RuntimeException("Exam start date must be before or equal to exam end date");
        }
    }

    private SemesterResponse mapToResponse(Semester semester) {
        SemesterResponse response = new SemesterResponse();
        response.setId(semester.getId());
        response.setCode(semester.getCode());
        response.setName(semester.getName());
        response.setStartDate(semester.getStartDate());
        response.setEndDate(semester.getEndDate());
        response.setExamStartDate(semester.getExamStartDate());
        response.setExamEndDate(semester.getExamEndDate());
        response.setStatus(semester.getStatus());
        response.setCreatedAt(semester.getCreatedAt());
        return response;
    }
}