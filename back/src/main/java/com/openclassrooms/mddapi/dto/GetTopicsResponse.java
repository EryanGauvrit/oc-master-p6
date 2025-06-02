package com.openclassrooms.mddapi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GetTopicsResponse {
    public GetTopicsResponse(Long id, String Title, String content, Boolean subscribed) {
        super();
        this.setId(id);
        this.setTitle(Title);
        this.setContent(content);
        this.subscribed = subscribed;
    }
    private Boolean subscribed;
    private Long id;
    private String title;
    private String content;
}