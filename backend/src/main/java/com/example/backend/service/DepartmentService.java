package com.example.backend.service;

import com.example.backend.dto.request.DepartmentRequest;
import com.example.backend.dto.response.DepartmentResponse;
import com.example.backend.entity.Department;
import com.example.backend.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentService {
    private final DepartmentRepository departmentRepository;

    @Transactional
    public DepartmentResponse create(DepartmentRequest request) {
        if (departmentRepository.existsByCode(request.getCode())) {
            throw new RuntimeException("Department code already exists");
        }

        Department department = new Department();
        department.setCode(request.getCode());
        department.setName(request.getName());
        department.setDescription(request.getDescription());
        departmentRepository.save(department);

        return mapToResponse(department);
    }

    public List<DepartmentResponse> getAll() {
        return departmentRepository.findAll().stream()
                .map(this::mapToResponse)
                .toList();
    }

    public DepartmentResponse getById(Integer id) {
        return mapToResponse(findDepartment(id));
    }

    @Transactional
    public DepartmentResponse update(Integer id, DepartmentRequest request) {
        Department department = findDepartment(id);

        if (!department.getCode().equals(request.getCode())
                && departmentRepository.existsByCode(request.getCode())) {
            throw new RuntimeException("Department code already exists");
        }

        department.setCode(request.getCode());
        department.setName(request.getName());
        department.setDescription(request.getDescription());
        departmentRepository.save(department);

        return mapToResponse(department);
    }

    @Transactional
    public void delete(Integer id) {
        departmentRepository.delete(findDepartment(id));
    }

    private Department findDepartment(Integer id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found"));
    }

    private DepartmentResponse mapToResponse(Department department) {
        DepartmentResponse response = new DepartmentResponse();
        response.setId(department.getId());
        response.setCode(department.getCode());
        response.setName(department.getName());
        response.setDescription(department.getDescription());
        response.setCreatedAt(department.getCreatedAt());
        return response;
    }
}