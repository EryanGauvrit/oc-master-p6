package com.openclassrooms.mddapi.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import com.openclassrooms.mddapi.configuration.SpringSecurityConfig;
import com.openclassrooms.mddapi.dto.UserAuthenticationDto;
import com.openclassrooms.mddapi.dto.UserAuthenticationResponseDto;
import com.openclassrooms.mddapi.dto.UserRegisterDto;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.services.JWTService;
import com.openclassrooms.mddapi.services.UserService;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {
    private final JWTService jwtService;
    private final UserService userService;
    private final SpringSecurityConfig springSecurityConfig;

    @Operation(summary = "User login")
    @PostMapping("/login")
    public UserAuthenticationResponseDto getToken(@RequestBody UserAuthenticationDto user) {
        Optional<String> email = user.getEmail();
        Optional<String> username = user.getUsername();
        User userFound;
        if(email.isPresent()) {
            userFound = userService.getByEmail(email.get());
        } else if(username.isPresent()) {
            userFound = userService.getByUsername(username.get());
        } else {
            throw new BadCredentialsException("Email or username is required");
        }

        if (userFound == null) {
            throw new BadCredentialsException("User not found");
        }
        // password check
        if (!springSecurityConfig.passwordEncoder().matches(user.getPassword(), userFound.getPassword())) {
            throw new BadCredentialsException("Password not match");
        }
        String token = jwtService.generateToken(userFound.getEmail());
        return new UserAuthenticationResponseDto(token, userFound);
    }

    @PostMapping("/register")
    public UserAuthenticationResponseDto register(@RequestBody UserRegisterDto user) {
        User userCreated = userService.create(user);
        if (userCreated == null) {
            throw new RuntimeException("User not created");
        }
        String token = jwtService.generateToken(userCreated.getEmail());
        return new UserAuthenticationResponseDto(token, userCreated);
    }

    @GetMapping("/me")
    public User getUserAuth(@RequestHeader("Authorization") String token) {
        // remove Bearer
        token = token.substring(7);
        String email = springSecurityConfig.jwtDecoder().decode(token).getSubject();
        return userService.getByEmail(email);
    }

    @PutMapping("/me")
    public UserAuthenticationResponseDto updateUser(@RequestHeader("Authorization") String token, @RequestBody User user) {
        // remove Bearer
        token = token.substring(7);
        String email = springSecurityConfig.jwtDecoder().decode(token).getSubject();
        Long id = userService.getByEmail(email).getId();
        User userUpdated = userService.update(id, user);
        String newToken = jwtService.generateToken(userUpdated.getEmail());
        return new UserAuthenticationResponseDto(newToken, userUpdated);
    }
}
