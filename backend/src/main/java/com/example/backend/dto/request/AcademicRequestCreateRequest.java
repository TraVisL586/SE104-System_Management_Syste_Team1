package com.example.backend.dto.request;

import com.example.backend.constant.AcademicRequestType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AcademicRequestCreateRequest {
    @NotNull(message = "Academic request type is required")
    private AcademicRequestType type;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Content is required")
    @Size(max = 1000, message = "Content must not exceed 1000 characters")
    private String content;

    @Size(max = 500, message = "Attachment URL must not exceed 500 characters")
    private String attachmentUrl;
}