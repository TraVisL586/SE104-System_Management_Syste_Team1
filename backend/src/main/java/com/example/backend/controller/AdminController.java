package com.example.backend.controller;

import com.example.backend.dto.request.CreateStudentRequest;
import com.example.backend.dto.request.UpdateStudentRequest;
import com.example.backend.dto.response.StudentResponse;
import com.example.backend.service.StudentService;

import com.example.backend.dto.request.CreateAccountRequest;
import com.example.backend.dto.request.ResetPasswordRequest;
import com.example.backend.dto.request.UpdateAccountStatusRequest;
import com.example.backend.dto.response.AccountResponse;
import com.example.backend.service.AccountService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final StudentService studentService;
    private final AccountService accountService;

    @PostMapping("/students")
    public ResponseEntity<StudentResponse> createStudent(@Valid @RequestBody CreateStudentRequest request) {
        return ResponseEntity.ok(studentService.createStudent(request));
    }

    @GetMapping("/students")
    public ResponseEntity<List<StudentResponse>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @GetMapping("/students/{id:\\d+}")
        public ResponseEntity<StudentResponse> getStudent(@PathVariable Integer id) {
        return ResponseEntity.ok(studentService.getStudentById(id));
    }

    @PutMapping("/students/{id:\\d+}")
    public ResponseEntity<StudentResponse> updateStudent(
            @PathVariable Integer id,
            @Valid @RequestBody UpdateStudentRequest request) {
        return ResponseEntity.ok(studentService.updateStudent(id, request));
    }

    @DeleteMapping("/students/{id:\\d+}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Integer id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/accounts")
    public ResponseEntity<AccountResponse> createAccount(
            @Valid @RequestBody CreateAccountRequest request) {
        return ResponseEntity.ok(accountService.createAccount(request));
    }

    @GetMapping("/accounts")
    public ResponseEntity<List<AccountResponse>> getAllAccounts() {
        return ResponseEntity.ok(accountService.getAllAccounts());
    }

    @GetMapping("/accounts/{id:\\d+}")
    public ResponseEntity<AccountResponse> getAccount(@PathVariable Integer id) {
        return ResponseEntity.ok(accountService.getAccountById(id));
    }

    @PatchMapping("/accounts/{id:\\d+}/status")
    public ResponseEntity<AccountResponse> updateAccountStatus(
            @PathVariable Integer id,
            @Valid @RequestBody UpdateAccountStatusRequest request) {
        return ResponseEntity.ok(accountService.updateStatus(id, request));
    }

    @PatchMapping("/accounts/{id:\\d+}/password")
    public ResponseEntity<Void> resetAccountPassword(
            @PathVariable Integer id,
            @Valid @RequestBody ResetPasswordRequest request) {
        accountService.resetPassword(id, request);
        return ResponseEntity.noContent().build();
    }
}