package com.example.backend.dto.request;

import com.example.backend.constant.PaymentProvider;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class PaymentRequest {
    @NotNull(message = "Tuition record id is required")
    private Integer tuitionRecordId;

    @NotNull(message = "Payment amount is required")
    @DecimalMin(value = "0.01", message = "Payment amount must be greater than 0")
    private BigDecimal amount;

    private PaymentProvider provider;

    @Getter
    @Setter
    public static class MockConfirm {
        @NotNull(message = "Success value is required")
        private Boolean success;

        @Size(max = 255, message = "Provider reference must not exceed 255 characters")
        private String providerReference;

        @Size(max = 500, message = "Failure reason must not exceed 500 characters")
        private String failureReason;
    }

    @Getter
    @Setter
    public static class MockWebhook {
        @NotNull(message = "Transaction code is required")
        private String transactionCode;

        @NotNull(message = "Success value is required")
        private Boolean success;

        @Size(max = 255, message = "Provider reference must not exceed 255 characters")
        private String providerReference;

        @Size(max = 500, message = "Failure reason must not exceed 500 characters")
        private String failureReason;
    }
}
