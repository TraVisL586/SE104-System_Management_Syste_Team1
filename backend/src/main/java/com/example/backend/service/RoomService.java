package com.example.backend.service;

import com.example.backend.dto.request.RoomRequest;
import com.example.backend.dto.response.RoomResponse;
import com.example.backend.entity.Room;
import com.example.backend.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

    @Transactional
    public RoomResponse create(RoomRequest request) {
        if (roomRepository.existsByCode(request.getCode())) {
            throw new RuntimeException("Room code already exists");
        }

        Room room = new Room();
        applyRequest(room, request);
        roomRepository.save(room);

        return mapToResponse(room);
    }

    public List<RoomResponse> getAll() {
        return roomRepository.findAll().stream()
                .map(this::mapToResponse)
                .toList();
    }

    public RoomResponse getById(Integer id) {
        return mapToResponse(findRoom(id));
    }

    @Transactional
    public RoomResponse update(Integer id, RoomRequest request) {
        Room room = findRoom(id);

        if (!room.getCode().equals(request.getCode())
                && roomRepository.existsByCode(request.getCode())) {
            throw new RuntimeException("Room code already exists");
        }

        applyRequest(room, request);
        roomRepository.save(room);

        return mapToResponse(room);
    }

    @Transactional
    public void delete(Integer id) {
        roomRepository.delete(findRoom(id));
    }

    private Room findRoom(Integer id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
    }

    private void applyRequest(Room room, RoomRequest request) {
        room.setCode(request.getCode());
        room.setName(request.getName());
        room.setBuilding(request.getBuilding());
        room.setCapacity(request.getCapacity());
        room.setIsActive(request.getIsActive() != null ? request.getIsActive() : true);
    }

    private RoomResponse mapToResponse(Room room) {
        RoomResponse response = new RoomResponse();
        response.setId(room.getId());
        response.setCode(room.getCode());
        response.setName(room.getName());
        response.setBuilding(room.getBuilding());
        response.setCapacity(room.getCapacity());
        response.setIsActive(room.getIsActive());
        response.setCreatedAt(room.getCreatedAt());
        return response;
    }
}