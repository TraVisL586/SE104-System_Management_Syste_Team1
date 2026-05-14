package com.example.backend.service;

import com.example.backend.dto.request.ProgramRequest;
import com.example.backend.dto.response.ProgramResponse;
import com.example.backend.entity.Department;
import com.example.backend.entity.Program;
import com.example.backend.repository.DepartmentRepository;
import com.example.backend.repository.ProgramRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProgramService {
    private final ProgramRepository programRepository;
    private final DepartmentRepository departmentRepository;

    @Transactional
    public ProgramResponse create(ProgramRequest request) {
        if (programRepository.existsByCode(request.getCode())) {
            throw new RuntimeException("Program code already exists");
        }

        Department department = findDepartment(request.getDepartmentId());

        Program program = new Program();
        program.setDepartment(department);
        program.setCode(request.getCode());
        program.setName(request.getName());
        program.setDegreeLevel(request.getDegreeLevel());
        program.setDurationYears(request.getDurationYears());
        program.setDescription(request.getDescription());
        programRepository.save(program);

        return mapToResponse(program);
    }

    public List<ProgramResponse> getAll() {
        return programRepository.findAll().stream()
                .map(this::mapToResponse)
                .toList();
    }

    public ProgramResponse getById(Integer id) {
        return mapToResponse(findProgram(id));
    }

    @Transactional
    public ProgramResponse update(Integer id, ProgramRequest request) {
        Program program = findProgram(id);

        if (!program.getCode().equals(request.getCode())
                && programRepository.existsByCode(request.getCode())) {
            throw new RuntimeException("Program code already exists");
        }

        Department department = findDepartment(request.getDepartmentId());

        program.setDepartment(department);
        program.setCode(request.getCode());
        program.setName(request.getName());
        program.setDegreeLevel(request.getDegreeLevel());
        program.setDurationYears(request.getDurationYears());
        program.setDescription(request.getDescription());
        programRepository.save(program);

        return mapToResponse(program);
    }

    @Transactional
    public void delete(Integer id) {
        programRepository.delete(findProgram(id));
    }

    private Program findProgram(Integer id) {
        return programRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Program not found"));
    }

    private Department findDepartment(Integer id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found"));
    }

    private ProgramResponse mapToResponse(Program program) {
        ProgramResponse response = new ProgramResponse();
        response.setId(program.getId());
        response.setCode(program.getCode());
        response.setName(program.getName());
        response.setDegreeLevel(program.getDegreeLevel());
        response.setDurationYears(program.getDurationYears());
        response.setDescription(program.getDescription());
        response.setCreatedAt(program.getCreatedAt());

        Department department = program.getDepartment();
        response.setDepartmentId(department.getId());
        response.setDepartmentCode(department.getCode());
        response.setDepartmentName(department.getName());

        return response;
    }
}