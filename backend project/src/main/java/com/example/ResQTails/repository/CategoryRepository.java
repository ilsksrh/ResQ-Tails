package com.example.ResQTails.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.ResQTails.models.Category;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByName(String name);
    Category findById(Integer id);
}
