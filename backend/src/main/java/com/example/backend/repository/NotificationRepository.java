package com.example.backend.repository;

import com.example.backend.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    List<Notification> findByRecipientIdOrderByCreatedAtDesc(Integer recipientUserId);

    List<Notification> findByRecipientIdAndReadOrderByCreatedAtDesc(Integer recipientUserId, Boolean read);

    List<Notification> findByRecipientIdAndRead(Integer recipientUserId, Boolean read);

    Optional<Notification> findByIdAndRecipientId(Integer id, Integer recipientUserId);
}
