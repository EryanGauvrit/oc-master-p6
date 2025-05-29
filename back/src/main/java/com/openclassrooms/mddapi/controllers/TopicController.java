package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.configuration.SpringSecurityConfig;
import com.openclassrooms.mddapi.dto.GetTopicsResponse;
import com.openclassrooms.mddapi.services.TopicService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/topics")
public class TopicController {
    private final TopicService topicService;
    private final SpringSecurityConfig springSecurityConfig;

    @GetMapping
    public List<GetTopicsResponse> getAllTopics(@RequestHeader("Authorization") String token) {
        // remove Bearer
        token = token.substring(7);
        String userEmail = springSecurityConfig.jwtDecoder().decode(token).getSubject();
        return topicService.getTopics(userEmail);
    }

    @PostMapping("/subscription")
    public Map<String, String> subscribeTopic(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> body) {
        // remove Bearer
        token = token.substring(7);
        String userEmail = springSecurityConfig.jwtDecoder().decode(token).getSubject();
        String message = topicService.subscribeTopic(userEmail, body.get("topicId"));
        Map<String, String> response = new HashMap<>();
        response.put("message", message);
        return response;
    }

    @DeleteMapping("/subscription/{topicId}")
    public Map<String, String> unsubscribeTopic(@RequestHeader("Authorization") String token, @PathVariable String topicId) {
        // remove Bearer
        token = token.substring(7);
        String userEmail = springSecurityConfig.jwtDecoder().decode(token).getSubject();
        String message = topicService.unsubscribeTopic(userEmail, topicId);
        Map<String, String> response = new HashMap<>();
        response.put("message", message);
        return response;
    }

}
