package com.openclassrooms.mddapi.dto;

import com.openclassrooms.mddapi.models.Topic;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Optional;

@Getter
@Setter
@AllArgsConstructor
public class GetTopicsResponse extends Topic {
    public GetTopicsResponse(Long id, String Title, String content, Boolean subscribed) {
        super();
        this.setId(id);
        this.setTitle(Title);
        this.setContent(content);
        this.subscribed = subscribed;
    }
    private Boolean subscribed;
}