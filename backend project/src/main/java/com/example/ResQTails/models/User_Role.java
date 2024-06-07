package com.example.ResQTails.models;

import jakarta.persistence.*;

@Entity
public class User_Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userRole_id")
    private Long userRoleId;
    private String name;
}