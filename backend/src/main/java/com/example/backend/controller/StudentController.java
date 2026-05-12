package com.example.backend.controller;

import com.example.backend.dto.request.ChangePasswordRequest;
import com.example.backend.dto.response.StudentResponse;
import com.example.backend.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @GetMapping("/me")
    public ResponseEntity<StudentResponse> getMyInfo(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(studentService.getStudentByUsername(userDetails.getUsername()));
    }

    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody ChangePasswordRequest request) {
        studentService.changePassword(userDetails.getUsername(), request);
        return ResponseEntity.ok("Đổi mật khẩu thành công");
    }
}