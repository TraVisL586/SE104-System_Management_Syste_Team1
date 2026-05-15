package com.example.backend.controller;

import com.example.backend.dto.request.PaymentRequest;
import com.example.backend.dto.response.PaymentResponse;
import com.example.backend.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping("/api/student/payments")
    public ResponseEntity<PaymentResponse> createPayment(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody PaymentRequest request) {
        return ResponseEntity.ok(paymentService.createPayment(userDetails.getUsername(), request));
    }

    @GetMapping("/api/student/payments")
    public ResponseEntity<List<PaymentResponse>> getMyPayments(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(paymentService.getMyPayments(userDetails.getUsername()));
    }

    @GetMapping("/api/student/payments/{paymentId:\\d+}")
    public ResponseEntity<PaymentResponse> getMyPayment(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Integer paymentId) {
        return ResponseEntity.ok(paymentService.getMyPayment(userDetails.getUsername(), paymentId));
    }

    @PostMapping("/api/student/payments/{paymentId:\\d+}/mock-confirm")
    public ResponseEntity<PaymentResponse> mockConfirmMyPayment(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Integer paymentId,
            @Valid @RequestBody PaymentRequest.MockConfirm request) {
        return ResponseEntity.ok(paymentService.mockConfirmMyPayment(
                userDetails.getUsername(),
                paymentId,
                request
        ));
    }

    @PatchMapping("/api/student/payments/{paymentId:\\d+}/cancel")
    public ResponseEntity<PaymentResponse> cancelMyPayment(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Integer paymentId) {
        return ResponseEntity.ok(paymentService.cancelMyPayment(userDetails.getUsername(), paymentId));
    }

    @PostMapping("/api/payments/mock-webhook")
    public ResponseEntity<PaymentResponse> mockWebhook(@Valid @RequestBody PaymentRequest.MockWebhook request) {
        return ResponseEntity.ok(paymentService.mockWebhook(request));
    }

    @GetMapping("/api/admin/payments")
    public ResponseEntity<List<PaymentResponse>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    @GetMapping("/api/admin/payments/{paymentId:\\d+}")
    public ResponseEntity<PaymentResponse> getPaymentById(@PathVariable Integer paymentId) {
        return ResponseEntity.ok(paymentService.getPaymentById(paymentId));
    }

    @GetMapping("/api/admin/payments/students/{studentId:\\d+}")
    public ResponseEntity<List<PaymentResponse>> getPaymentsByStudent(@PathVariable Integer studentId) {
        return ResponseEntity.ok(paymentService.getPaymentsByStudent(studentId));
    }

    @GetMapping("/api/admin/payments/tuition-records/{tuitionRecordId:\\d+}")
    public ResponseEntity<List<PaymentResponse>> getPaymentsByTuitionRecord(@PathVariable Integer tuitionRecordId) {
        return ResponseEntity.ok(paymentService.getPaymentsByTuitionRecord(tuitionRecordId));
    }
}
