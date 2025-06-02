package com.openclassrooms.mddapi.repositories;
import com.openclassrooms.mddapi.models.Topic;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.openclassrooms.mddapi.models.Post;

import java.util.List;

public interface  PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByTopicIn(List<Topic> topics, Sort sort);

}
