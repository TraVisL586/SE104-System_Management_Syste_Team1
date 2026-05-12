package com.example.backend.constant;

public enum RoleName {
    ADMIN,
    STUDENT,
    TEACHER;

    public String value() {
        return this.name();
    }
}