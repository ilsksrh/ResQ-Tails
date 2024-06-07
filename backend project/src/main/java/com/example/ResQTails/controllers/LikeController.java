package com.example.ResQTails.controllers;

import com.example.ResQTails.security.services.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/likes")
public class LikeController {
    @Autowired
    private LikeService likeService;

    @PostMapping("/like")
    public ResponseEntity<?> likePost(@RequestParam Long userId, @RequestParam Long postId) {
        likeService.likePost(userId, postId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/unlike")
    public ResponseEntity<?> unlikePost(@RequestParam Long userId, @RequestParam Long postId) {
        likeService.unlikePost(userId, postId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/isLiked")
    public ResponseEntity<Boolean> isPostLiked(@RequestParam Long userId, @RequestParam Long postId) {
        boolean isLiked = likeService.isPostLikedByUser(userId, postId);
        return ResponseEntity.ok(isLiked);
    }

    @GetMapping("/likeCount")
    public ResponseEntity<Integer> getLikeCount(@RequestParam Long postId) {
        int likeCount = likeService.getLikeCount(postId);
        return ResponseEntity.ok(likeCount);
    }
}
