package com.example.backend.entity;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class AdvisorStudentId implements Serializable {
    private Integer advisor;
    private Integer student;
}