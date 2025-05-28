package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.configuration.SpringSecurityConfig;
import com.openclassrooms.mddapi.dto.CommentCreationDto;
import com.openclassrooms.mddapi.models.Comment;
import com.openclassrooms.mddapi.models.Post;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.services.CommentService;
import com.openclassrooms.mddapi.services.PostService;
import com.openclassrooms.mddapi.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
@AllArgsConstructor
public class CommentController {
    private final CommentService commentService;
    private final UserService userService;
    private final SpringSecurityConfig springSecurityConfig;
    private final PostService postService;

    @PostMapping
    public Comment createComment(@RequestBody CommentCreationDto body,@RequestHeader("Authorization") String token) {
        // remove Bearer
        token = token.substring(7);
        String email = springSecurityConfig.jwtDecoder().decode(token).getSubject();
        User user = userService.getByEmail(email);
        Post post = postService.getPostById(body.getPostId());
        Comment comment = new Comment();
        comment.setContent(body.getContent());
        comment.setUser(user);
        comment.setPost(post);

        return commentService.addComment(comment);
    }
}
