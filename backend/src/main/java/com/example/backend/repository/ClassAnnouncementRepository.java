package com.example.backend.repository;

import com.example.backend.entity.ClassAnnouncement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassAnnouncementRepository extends JpaRepository<ClassAnnouncement, Integer> {
    List<ClassAnnouncement> findByCourseSectionIdOrderByCreatedAtDesc(Integer courseSectionId);
}
