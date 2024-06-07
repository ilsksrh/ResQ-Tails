package com.example.ResQTails.models;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;


@Entity
@Table(name = "Supplies")
public class Supply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "supply_id")
    private Long supplyId;

    private String category;
    private String description;
    private LocalDate expirationDate;
    private int quantity;
    private BigDecimal price;

    @ManyToOne
    @JoinColumn(name = "treatment_id")
    private Treatment treatment;
}