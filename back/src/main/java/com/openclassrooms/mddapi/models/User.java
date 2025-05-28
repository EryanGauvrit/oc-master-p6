package com.openclassrooms.mddapi.models;

import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties({"comments", "posts", "password"})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String username;
    private String password;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    @OneToMany(mappedBy = "user")
    private List<Comment> comments;

    @OneToMany(mappedBy = "author")
    private List<Post> posts;

    @ManyToMany
    @JoinTable(
        name = "subscriptions",
        joinColumns = @JoinColumn(name = "subscribing_user_id"),
        inverseJoinColumns = @JoinColumn(name = "subscribed_topic_id")
    )
    private List<Topic> subscriptions;
}
