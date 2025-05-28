package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.models.Post;
import com.openclassrooms.mddapi.repositories.PostRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PostService {
    private PostRepository postRepository;

    public List<Post> getAllPosts(Optional<String> order) {
        if (order.isPresent() && order.get().equalsIgnoreCase("asc")) { // check if order is "asc"
            return postRepository.findAllByOrderByCreatedAtAsc();
        } else {
            return postRepository.findAllByOrderByCreatedAtDesc();
        }
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + id));
    }
    public Post createPost(Post post) {
        Instant now = Instant.now();
        Timestamp timestamp = Timestamp.from(now);
        post.setCreatedAt(timestamp);
        post.setUpdatedAt(timestamp);
        return postRepository.save(post);
    }

}
