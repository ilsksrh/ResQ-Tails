package com.example.ResQTails.models;

import jakarta.persistence.*;

@Entity
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;
    private String description;

    private String realizationTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Plan() {
    }

    public Plan(String date, String description, String realizationTime, User user) {
        this.date = date;
        this.description = description;
        this.realizationTime = realizationTime;
        this.user = user;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getRealizationTime() {
        return realizationTime;
    }

    public void setRealizationTime(String realizationTime) {
        this.realizationTime = realizationTime;
    }

    // геттеры и сеттеры
}
