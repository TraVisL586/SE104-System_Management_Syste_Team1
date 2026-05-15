package com.example.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AuditLogResponse {
    private Integer id;
    private String actorUsername;
    private String action;
    private String targetType;
    private Integer targetId;
    private String details;
    private LocalDateTime createdAt;
}