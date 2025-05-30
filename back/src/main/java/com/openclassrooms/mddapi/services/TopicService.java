package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.GetTopicsResponse;
import com.openclassrooms.mddapi.models.Topic;
import com.openclassrooms.mddapi.repositories.TopicRepository;
import com.openclassrooms.mddapi.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TopicService {
    private final TopicRepository topicRepository;
    private final UserRepository userRepository;

    public List<GetTopicsResponse> getTopics(String email) {
        List<Topic> userSubscriptions = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"))
                .getSubscriptions();
        List<Topic> topics = topicRepository.findAll(Sort.by("title").ascending());

        return topics.stream().map(topic -> {
            boolean isSubscribed = userSubscriptions.stream()
                    .anyMatch(subscription -> subscription.getId().equals(topic.getId()));
            return new GetTopicsResponse(topic.getId(), topic.getTitle(), topic.getContent(), isSubscribed);
        }).toList();
    }

    public List<GetTopicsResponse> getTopicsByUser(String email) {
        List<Topic> userSubscriptions = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"))
                .getSubscriptions();

        return userSubscriptions.stream().map(topic -> new GetTopicsResponse(topic.getId(), topic.getTitle(), topic.getContent(), true)).toList();
    }

    public Topic getTopicById(Long id) {
        return topicRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Topic not found with id: " + id));
    }

    public String subscribeTopic(String email, String topicId) {
        Topic topic = topicRepository.findById(Long.parseLong(topicId))
                .orElseThrow(() -> new IllegalArgumentException("Topic not found"));
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (user.getSubscriptions().stream().anyMatch(subscription -> subscription.getId().equals(topic.getId()))) {
            return "You are already subscribed to this topic";
        }

        user.getSubscriptions().add(topic);
        userRepository.save(user);
        return "You have successfully subscribed to the topic";
    }

    public String unsubscribeTopic(String email, String topicId) {
        Topic topic = topicRepository.findById(Long.parseLong(topicId))
                .orElseThrow(() -> new IllegalArgumentException("Topic not found"));
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (user.getSubscriptions().removeIf(subscription -> subscription.getId().equals(topic.getId()))) {
            userRepository.save(user);
            return "You have successfully unsubscribed from the topic";
        } else {
            return "You are not subscribed to this topic";
        }
    }
}
