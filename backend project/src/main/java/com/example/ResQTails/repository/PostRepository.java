package com.example.ResQTails.repository;

import com.example.ResQTails.models.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByCategoryId(Long categoryId);

    List<Post> findByUserId(Long userId);

    List<Post> findByCategoryIdAndUserId(Long categoryId, Long userId);

    List<Post> findByTitleContainingOrDescriptionContaining(String titleKeyword, String descriptionKeyword);

    List<Post> findPostsByTagsId(Long tagId);

    @Query("SELECT p " +
            "FROM Post p " +
            "JOIN p.tags t " +
            "WHERE t.id IN :tagIds " +
            "GROUP BY p " +
            "HAVING COUNT(DISTINCT t) = :tagCount")
    List<Post> findPostsByTagIds(@Param("tagIds") List<Long> tagIds, @Param("tagCount") Long tagCount);
}
