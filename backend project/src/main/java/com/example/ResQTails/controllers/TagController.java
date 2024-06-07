package com.example.ResQTails.controllers;
import com.example.ResQTails.exception.ResourceNotFoundException;
import com.example.ResQTails.models.Tag;
import com.example.ResQTails.models.Post;
import com.example.ResQTails.repository.PostRepository;


import com.example.ResQTails.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.ResQTails.models.Tag;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TagController {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private TagRepository tagRepository;


    @GetMapping("/tags")
    public ResponseEntity<List<Tag>> getAllTags() {
        List<Tag> tags = new ArrayList<Tag>();

        tagRepository.findAll().forEach(tags::add);

        if (tags.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(tags, HttpStatus.OK);
    }

    @GetMapping("/posts/{postId}/tags")
    public ResponseEntity<List<Tag>> getAllTagsByPostId(@PathVariable(value = "postId") Long postId) {
        if (!postRepository.existsById(postId)) {
            throw new ResourceNotFoundException("Not found Post with id = " + postId);
        }

        List<Tag> tags = tagRepository.findTagsByPostsId(postId);
        return new ResponseEntity<>(tags, HttpStatus.OK);
    }

    @GetMapping("/tags/{id}")
    public ResponseEntity<Tag> getTagsById(@PathVariable(value = "id") Long id) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Tag with id = " + id));

        return new ResponseEntity<>(tag, HttpStatus.OK);
    }

    @GetMapping("/tags/{tagId}/posts")
    public ResponseEntity<List<Post>> getAllPostsByTagId(@PathVariable(value = "tagId") Long tagId) {
        if (!tagRepository.existsById(tagId)) {
            throw new ResourceNotFoundException("Not found Tag  with id = " + tagId);
        }

        List<Post> posts = postRepository.findPostsByTagsId(tagId);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @PostMapping("/posts/{postId}/tags")
    public ResponseEntity<Tag> addTag(@PathVariable(value = "postId") Long postId, @RequestBody Tag tagRequest) {
        Tag tag = postRepository.findById(postId).map(post -> {
            long tagId = tagRequest.getId();

            // tag is existed
            if (tagId != 0L) {
                Tag _tag = tagRepository.findById(tagId)
                        .orElseThrow(() -> new ResourceNotFoundException("Not found Tag with id = " + tagId));
                post.addTag(_tag);
                postRepository.save(post);
                return _tag;
            }

            // add and create new Tag
            post.addTag(tagRequest);
            return tagRepository.save(tagRequest);
        }).orElseThrow(() -> new ResourceNotFoundException("Not found Post with id = " + postId));

        return new ResponseEntity<>(tag, HttpStatus.CREATED);
    }

    @PutMapping("/tags/{id}")
    @PreAuthorize("hasRole('ROLE_MODERATOR')")
    public ResponseEntity<Tag> updateTag(@PathVariable("id") long id, @RequestBody Tag tagRequest) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TagId " + id + "not found"));

        tag.setName(tagRequest.getName());

        return new ResponseEntity<>(tagRepository.save(tag), HttpStatus.OK);
    }

    @DeleteMapping("/posts/{postId}/tags/{tagId}")
    @PreAuthorize("hasRole('ROLE_MODERATOR')")
    public ResponseEntity<HttpStatus> deleteTagFromPost(@PathVariable(value = "postId") Long postId, @PathVariable(value = "tagId") Long tagId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Post with id = " + postId));

        post.removeTag(tagId);
        postRepository.save(post);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/tags/{id}")
    @PreAuthorize("hasRole('ROLE_MODERATOR')")
    public ResponseEntity<HttpStatus> deleteTag(@PathVariable("id") long id) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Tag with id = " + id));

        List<Post> posts = postRepository.findPostsByTagsId(id);
        for (Post post : posts) {
            post.removeTag(id);
            postRepository.save(post);
        }

        tagRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/byTags")
    public ResponseEntity<List<Post>> getPostsByTags(@RequestParam List<Long> tagIds) {
        List<Post> posts = postRepository.findPostsByTagIds(tagIds, (long) tagIds.size());

        return new ResponseEntity<>(posts, HttpStatus.OK);
    }
    @PostMapping("/posts/{postId}/tags/{tagId}")
    public ResponseEntity<Tag> addExistingTagToPost(@PathVariable(value = "postId") Long postId, @PathVariable(value = "tagId") Long tagId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Post with id = " + postId));

        Tag tag = tagRepository.findById(tagId)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Tag with id = " + tagId));

        post.addTag(tag);
        postRepository.save(post);

        return new ResponseEntity<>(tag, HttpStatus.CREATED);
    }


    @PostMapping("/tags")
    @PreAuthorize("hasRole('ROLE_MODERATOR')")
    public ResponseEntity<Tag> createTag(@RequestBody Tag tagRequest) {
        Tag tag = tagRepository.save(tagRequest);
        return new ResponseEntity<>(tag, HttpStatus.CREATED);
    }

}