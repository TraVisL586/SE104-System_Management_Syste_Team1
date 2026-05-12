package com.example.backend.service;

import com.example.backend.constant.RoleName;
import com.example.backend.dto.request.ChangePasswordRequest;
import com.example.backend.dto.request.CreateStudentRequest;
import com.example.backend.dto.request.UpdateStudentRequest;
import com.example.backend.dto.response.StudentResponse;
import com.example.backend.entity.Role;
import com.example.backend.entity.Student;
import com.example.backend.entity.User;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.StudentRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public StudentResponse createStudent(CreateStudentRequest request) {
        if (userRepository.existsByUsername(request.getUsername()))
            throw new RuntimeException("Username đã tồn tại");
        if (userRepository.existsByEmail(request.getEmail()))
            throw new RuntimeException("Email đã tồn tại");
        if (studentRepository.existsByStudentCode(request.getStudentCode()))
            throw new RuntimeException("Mã sinh viên đã tồn tại");

        Role studentRole = roleRepository.findByName(RoleName.STUDENT)
                .orElseThrow(() -> new RuntimeException("Role STUDENT chưa được tạo trong DB"));

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setFullName(request.getFullName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setIsActive(true);
        user.setRoles(Set.of(studentRole));
        userRepository.save(user);

        Student student = new Student();
        student.setUser(user);
        student.setStudentCode(request.getStudentCode());
        student.setFullName(request.getFullName());
        student.setEmail(request.getEmail());
        student.setPhone(request.getPhone());
        student.setDateOfBirth(request.getDateOfBirth());
        studentRepository.save(student);

        return mapToResponse(student);
    }

    public List<StudentResponse> getAllStudents() {
        return studentRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public StudentResponse getStudentById(Integer id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sinh viên"));
        return mapToResponse(student);
    }

    public StudentResponse getStudentByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));
        Student student = studentRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sinh viên"));
        return mapToResponse(student);
    }

    @Transactional
    public StudentResponse updateStudent(Integer id, UpdateStudentRequest request) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sinh viên"));

        student.setFullName(request.getFullName());
        student.setEmail(request.getEmail());
        student.setPhone(request.getPhone());
        student.setDateOfBirth(request.getDateOfBirth());

        User user = student.getUser();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        if (request.getIsActive() != null)
            user.setIsActive(request.getIsActive());

        userRepository.save(user);
        studentRepository.save(student);

        return mapToResponse(student);
    }

    @Transactional
    public void deleteStudent(Integer id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sinh viên"));
        studentRepository.delete(student);
        userRepository.delete(student.getUser());
    }

    @Transactional
    public void changePassword(String username, ChangePasswordRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword()))
            throw new RuntimeException("Mật khẩu cũ không đúng");

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    private StudentResponse mapToResponse(Student student) {
        StudentResponse res = new StudentResponse();
        res.setId(student.getId());
        res.setStudentCode(student.getStudentCode());
        res.setFullName(student.getFullName());
        res.setEmail(student.getEmail());
        res.setPhone(student.getPhone());
        res.setDateOfBirth(student.getDateOfBirth());
        res.setCreatedAt(student.getCreatedAt());
        if (student.getUser() != null) {
            res.setUsername(student.getUser().getUsername());
            res.setIsActive(student.getUser().getIsActive());
        }
        return res;
    }
}