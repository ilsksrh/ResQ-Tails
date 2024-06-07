package com.example.ResQTails.security.services;

import com.example.ResQTails.payload.request.PlanDto;
import com.example.ResQTails.models.Plan;
import com.example.ResQTails.repository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlanService {

    private final PlanRepository planRepository;

    @Autowired
    public PlanService(PlanRepository planRepository) {
        this.planRepository = planRepository;
    }

    public Plan getPlanById(Long id) {
        Optional<Plan> plan = planRepository.findById(id);
        return plan.orElse(null);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Plan createPlan(Plan plan) {
        return planRepository.save(plan);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Plan updatePlan(Long id, Plan plan) {
        Plan existingPlan = getPlanById(id);
        if (existingPlan == null) {
            return null;
        }
        existingPlan.setDate(plan.getDate());
        existingPlan.setDescription(plan.getDescription());
        existingPlan.setRealizationTime(plan.getRealizationTime());
        // Set user if necessary
        // existingPlan.setUser(plan.getUser());
        return planRepository.save(existingPlan);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deletePlan(Long id) {
        planRepository.deleteById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<Plan> getPlansByUserId(Long userId) {
        return planRepository.findByUserId(userId);
    }
}
