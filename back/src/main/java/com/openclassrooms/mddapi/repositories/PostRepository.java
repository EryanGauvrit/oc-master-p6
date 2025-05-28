package com.openclassrooms.mddapi.repositories;
import org.springframework.data.jpa.repository.JpaRepository;

import com.openclassrooms.mddapi.models.Post;

import java.util.List;

public interface  PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByOrderByCreatedAtDesc();
    List<Post> findAllByOrderByCreatedAtAsc();

}
