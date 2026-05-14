package com.example.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistrationRequest {

    @NotNull(message = "Course section id is required")
    private Integer courseSectionId;
}