package com.example.ResQTails.security.services;

import com.example.ResQTails.models.Category;
import com.example.ResQTails.models.ERole;
import com.example.ResQTails.models.Post;
import com.example.ResQTails.models.User;
import com.example.ResQTails.payload.request.PostDto;
import com.example.ResQTails.repository.CategoryRepository;
import com.example.ResQTails.repository.PostRepository;
import com.example.ResQTails.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserService userService;
    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public Post createPost(PostDto postDto) {
        Post post = new Post();
        User currentUser = userService.getCurrentUser();
        post.setUser(currentUser);
        post.setCreatedAt(LocalDateTime.now());
        mapPostDtoToPost(post, postDto);
        return postRepository.saveAndFlush(post);
    }

    private void mapPostDtoToPost(Post post, PostDto postDto) {
        post.setTitle(postDto.getTitle());
        post.setPhoto(postDto.getPhoto());
        post.setStatus(postDto.getStatus());
        post.setDescription(postDto.getDescription());
        Category category = categoryRepository.findById(Long.valueOf(postDto.getCategoryId())).orElse(null);
        post.setCategory(category);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id).orElse(null);
    }

    public List<Post> searchPostsByKeyword(String keyword) {
        return postRepository.findByTitleContainingOrDescriptionContaining(keyword, keyword);
    }

    public List<Post> getPostsByCategory(Long categoryId) {
        return postRepository.findByCategoryId(categoryId);
    }

    public List<Post> getPostsByUser(Long userId) {
        return postRepository.findByUserId(userId);
    }

    public List<Post> getPostsByCategoryAndUser(Long categoryId, Long userId) {
        return postRepository.findByCategoryIdAndUserId(categoryId, userId);
    }

    public boolean canEditPost(Long postId) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post != null) {
            User currentUser = userService.getCurrentUser();
            boolean isAuthor = post.getUser().getId().equals(currentUser.getId());
            boolean isModerator = currentUser.getRoles().stream()
                    .anyMatch(role -> role.getName().equals(ERole.ROLE_MODERATOR));
            return isAuthor || isModerator;
        }
        return false;
    }

    public boolean canDeletePost(Long postId) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post != null) {
            User currentUser = userService.getCurrentUser();
            boolean isAuthor = post.getUser().getId().equals(currentUser.getId());
            boolean isModerator = currentUser.getRoles().stream()
                    .anyMatch(role -> role.getName().equals(ERole.ROLE_MODERATOR));
            return isAuthor || isModerator;
        }
        return false;
    }

    public Post updatePost(Long id, PostDto updatedPostDto) {
        Post existingPost = postRepository.findById(id).orElse(null);
        if (existingPost != null && canEditPost(id)) {
            mapPostDtoToPost(existingPost, updatedPostDto);
            existingPost.setId(id);
            return postRepository.save(existingPost);
        }
        return null;
    }

    public boolean deletePost(Long id) {
        Post post = postRepository.findById(id).orElse(null);
        if (post != null && canDeletePost(id)) {
            postRepository.deleteById(id);
            return true;
        }
        return false;
    }
}