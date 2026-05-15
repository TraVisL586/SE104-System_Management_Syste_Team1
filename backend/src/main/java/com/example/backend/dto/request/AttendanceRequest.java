package com.example.backend.dto.request;

import com.example.backend.constant.AttendanceStatus;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

public class AttendanceRequest {

    @Getter
    @Setter
    public static class Session {
        @NotNull(message = "Attendance date is required")
        private LocalDate attendanceDate;

        @NotEmpty(message = "Attendance records are required")
        @Valid
        private List<Record> records;
    }

    @Getter
    @Setter
    public static class Record {
        @NotNull(message = "Student id is required")
        private Integer studentId;

        @NotNull(message = "Attendance status is required")
        private AttendanceStatus status;

        @Size(max = 500, message = "Note must not exceed 500 characters")
        private String note;
    }
}
