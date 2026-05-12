package com.example.backend.constant;

public enum PermissionName {
    // Sinh viên
    VIEW_STUDENT,
    CREATE_STUDENT,
    UPDATE_STUDENT,
    DELETE_STUDENT,
    CHANGE_PASSWORD;

    public String value() {
        return this.name();
    }
}