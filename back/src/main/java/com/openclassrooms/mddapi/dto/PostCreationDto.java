package com.openclassrooms.mddapi.dto;

import com.openclassrooms.mddapi.models.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PostCreationDto {
    private String title;
    private String content;
    private Long topicId;
}
