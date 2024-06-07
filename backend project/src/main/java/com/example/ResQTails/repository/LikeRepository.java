package com.example.ResQTails.repository;

import com.example.ResQTails.models.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    boolean existsByUserIdAndPostId(Long userId, Long postId);
    int countByPostId(Long postId);

    Optional<Like> findByUserIdAndPostId(Long userId, Long postId);
}
