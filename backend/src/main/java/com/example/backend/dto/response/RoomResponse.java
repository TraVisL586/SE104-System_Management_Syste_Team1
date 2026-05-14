package com.example.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class RoomResponse {
    private Integer id;
    private String code;
    private String name;
    private String building;
    private Integer capacity;
    private Boolean isActive;
    private LocalDateTime createdAt;
}