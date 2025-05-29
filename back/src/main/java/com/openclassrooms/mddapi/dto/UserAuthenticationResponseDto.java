package com.openclassrooms.mddapi.dto;

import com.openclassrooms.mddapi.models.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserAuthenticationResponseDto {
    private String token;
    private User user;
}
