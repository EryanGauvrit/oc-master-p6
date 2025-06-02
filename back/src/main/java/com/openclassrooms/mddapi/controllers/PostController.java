package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.configuration.SpringSecurityConfig;
import com.openclassrooms.mddapi.dto.PostCreationDto;
import com.openclassrooms.mddapi.models.Post;
import com.openclassrooms.mddapi.models.Topic;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repositories.PostRepository;
import com.openclassrooms.mddapi.services.PostService;
import com.openclassrooms.mddapi.services.TopicService;
import com.openclassrooms.mddapi.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/posts")
public class PostController {
    private final PostService postService;
    private final UserService userService;
    private final SpringSecurityConfig springSecurityConfig;
    private final TopicService topicService;

    @GetMapping
    public List<Post> getPosts(@RequestParam Optional<String> order, @RequestHeader("Authorization") String token) {
        token = token.substring(7);
        String email = springSecurityConfig.jwtDecoder().decode(token).getSubject();
        User user = userService.getByEmail(email);
        if (user.getSubscriptions().isEmpty()) {
            return postService.getAllPosts(order, List.of());
        }
        List<Topic> topics = user.getSubscriptions();
        return postService.getAllPosts(order, topics);
    }

    @GetMapping("/{id}")
    public Post getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    @PostMapping
    public Post createPost(@RequestBody PostCreationDto postBody, @RequestHeader("Authorization") String token) {
        // remove Bearer
        token = token.substring(7);
        String email = springSecurityConfig.jwtDecoder().decode(token).getSubject();
        User user = userService.getByEmail(email);
        Topic topic = topicService.getTopicById(postBody.getTopicId());
        Post post = new Post();
        post.setTitle(postBody.getTitle());
        post.setContent(postBody.getContent());
        post.setAuthor(user);
        post.setTopic(topic);
        return postService.createPost(post);
    }
}
