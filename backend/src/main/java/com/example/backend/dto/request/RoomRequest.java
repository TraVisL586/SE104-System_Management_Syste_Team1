package com.example.backend.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomRequest {

    @NotBlank(message = "Room code is required")
    @Size(max = 50, message = "Room code must not exceed 50 characters")
    private String code;

    @NotBlank(message = "Room name is required")
    private String name;

    private String building;

    @Min(value = 1, message = "Room capacity must be at least 1")
    private Integer capacity;

    private Boolean isActive;
}