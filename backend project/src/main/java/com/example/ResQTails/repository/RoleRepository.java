package com.example.ResQTails.repository;

import com.example.ResQTails.models.ERole;
import com.example.ResQTails.models.Role;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
