package com.example.ResQTails.models;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
@Entity
@Table(name = "Expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "expense_id")
    private Long expenseId;

    private String category;
    private String description;
    private BigDecimal amount;
    private LocalDateTime date;

    @OneToOne(mappedBy = "expense")
    private Treatment treatment;

}