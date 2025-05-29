package com.openclassrooms.mddapi.services;


import java.sql.Timestamp;
import java.time.Instant;

import com.openclassrooms.mddapi.dto.UserRegisterDto;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.configuration.SpringSecurityConfig;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private  final SpringSecurityConfig springSecurityConfig;

    public User create(UserRegisterDto body) {
        if(body.getUsername() == null || body.getPassword() == null || body.getEmail() == null) {
            throw new IllegalArgumentException("Username, password and email are required");
        }
        Instant now = Instant.now();
        Timestamp timestamp = Timestamp.from(now);
        String hashedPassword = springSecurityConfig.passwordEncoder().encode(body.getPassword());
        User user = new User();
        user.setUsername(body.getUsername());
        user.setEmail(body.getEmail());
        user.setCreatedAt(timestamp);
        user.setUpdatedAt(timestamp);
        user.setPassword(hashedPassword);
        return userRepository.save(user);
    }

    public User getByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new SecurityException("User not found"));
    }

    public User getByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new SecurityException("User not found"));
    }

    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new SecurityException("User not found"));
    }

    public User update(Long id, User user) {
        Instant now = Instant.now();
        Timestamp timestamp = Timestamp.from(now);
        User userToUpdate = userRepository.findById(id).orElseThrow(() -> new SecurityException("User not found"));

        userToUpdate.setUpdatedAt(timestamp);
        userToUpdate.setUsername(user.getUsername());
        userToUpdate.setEmail(user.getEmail());
        String hashedPassword = springSecurityConfig.passwordEncoder().encode(user.getPassword());
        userToUpdate.setPassword(hashedPassword);
        return userRepository.save(userToUpdate);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }

}
