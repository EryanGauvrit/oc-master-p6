package com.openclassrooms.mddapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.openclassrooms.mddapi.models.Topic;

public interface TopicRepository extends JpaRepository<Topic, Object> {

}
