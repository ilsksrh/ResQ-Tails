package com.example.ResQTails.models;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "User_Ratings")
public class UserRating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rating_id")
    private Long ratingId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private int totalDonations;
    private LocalDateTime dateUpdated;

}