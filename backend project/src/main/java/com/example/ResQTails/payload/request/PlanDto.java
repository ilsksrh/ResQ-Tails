package com.example.ResQTails.payload.request;

public class PlanDto {
    private Long id;
    private String date;
    private String description;
    private Long userId;  // Assuming you want to link it to the user
    private String realizationTime;

    public PlanDto() {
    }

    public PlanDto(Long id, String date, String description, Long userId, String realizationTime) {
        this.id = id;
        this.date = date;
        this.description = description;
        this.userId = userId;
        this.realizationTime = realizationTime;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getRealizationTime() {
        return realizationTime;
    }

    public void setRealizationTime(String realizationTime) {
        this.realizationTime = realizationTime;
    }
}
