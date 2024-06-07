package com.example.ResQTails.controllers;

import com.example.ResQTails.models.Post;
import com.example.ResQTails.payload.request.PostDto;
import com.example.ResQTails.repository.PostRepository;
import com.example.ResQTails.security.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    PostRepository postRepository;

    @Autowired
    private PostService postService;

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody PostDto postDto) {
        Post post = postService.createPost(postDto);
        return new ResponseEntity<>(post, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Post>> getPostsByCategoryAndUser(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) String keyword) {
        List<Post> posts;
        if (categoryId != null && userId != null) {
            posts = postService.getPostsByCategoryAndUser(categoryId, userId);
        } else if (categoryId != null) {
            posts = postService.getPostsByCategory(categoryId);
        } else if (userId != null) {
            posts = postService.getPostsByUser(userId);
        } else if (keyword != null && !keyword.isEmpty()) {
            posts = postService.searchPostsByKeyword(keyword);
        } else {
            posts = postService.getAllPosts();
        }
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        Post post = postService.getPostById(id);
        if (post != null) {
            return new ResponseEntity<>(post, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("@postService.canEditPost(#id)")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody PostDto updatedPostDto) {
        Post updatedPost = postService.updatePost(id, updatedPostDto);
        if (updatedPost != null) {
            return new ResponseEntity<>(updatedPost, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@postService.canDeletePost(#id)")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        boolean isDeleted = postService.deletePost(id);
        if (isDeleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}