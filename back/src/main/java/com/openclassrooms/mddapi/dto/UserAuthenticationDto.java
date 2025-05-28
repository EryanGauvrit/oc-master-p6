package com.openclassrooms.mddapi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Getter
@Setter
@AllArgsConstructor
public class UserAuthenticationDto {
    private Optional<String> email;
    private Optional<String> username;
    private String password;
}