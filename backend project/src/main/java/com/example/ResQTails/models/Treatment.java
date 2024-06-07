package com.example.ResQTails.models;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "Treatment")
public class Treatment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "treatment_id")
    private Long treatmentId;

    @ManyToOne
    @JoinColumn(name = "animal_id")
    private Animal animal;

    private String description;
    private LocalDateTime date;
    private BigDecimal paymentAmount;

    @ManyToOne
    @JoinColumn(name = "expense_id")
    private Expense expense;

    @OneToMany(mappedBy = "treatment")
    private List<Supply> supplies;

}