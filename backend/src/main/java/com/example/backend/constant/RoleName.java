package com.example.backend.constant;

public enum RoleName {
    ADMIN,
    STUDENT,
    LECTURER,
    ACADEMIC_ADVISOR;

    public String value() {
        return this.name();
    }
}