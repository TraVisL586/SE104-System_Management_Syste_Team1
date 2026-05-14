package com.example.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
public class CourseSectionScheduleResponse {
    private Integer id;
    private Integer roomId;
    private String roomCode;
    private String roomName;
    private Integer dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;
}