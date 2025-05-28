package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.repositories.CommentRepository;
import com.openclassrooms.mddapi.models.Comment;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;

@Service
@AllArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;

    public Comment addComment(Comment comment) {
        if (comment.getContent() == null || comment.getContent().isEmpty()) {
            throw new IllegalArgumentException("Comment content cannot be null or empty");
        }
        if (comment.getPost() == null) {
            throw new IllegalArgumentException("Comment must be associated with a post");
        }
        Instant now = Instant.now();
        Timestamp timestamp = Timestamp.from(now);
        comment.setCreatedAt(timestamp);
        comment.setUpdatedAt(timestamp);
        return commentRepository.save(comment);
    }
}
