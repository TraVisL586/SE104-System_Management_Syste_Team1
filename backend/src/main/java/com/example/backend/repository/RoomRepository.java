package com.example.backend.repository;

import com.example.backend.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Integer> {
    boolean existsByCode(String code);
}