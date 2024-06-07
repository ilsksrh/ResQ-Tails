package com.example.ResQTails.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ResQTails.models.Tag;

public interface TagRepository extends JpaRepository<Tag, Long> {
    List<Tag> findTagsByPostsId(Long postId);
}