package com.example.ResQTails.controllers;

import com.example.ResQTails.payload.request.PlanDto;
import com.example.ResQTails.models.Plan;
import com.example.ResQTails.security.services.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/plans")
public class PlanController {

    private final PlanService planService;

    @Autowired
    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlanDto> getPlanById(@PathVariable Long id) {
        Plan plan = planService.getPlanById(id);
        PlanDto planDto = convertToDto(plan);
        return ResponseEntity.ok(planDto);
    }

    @PostMapping("/create")
    public ResponseEntity<PlanDto> createPlan(@RequestBody PlanDto planDto) {
        Plan plan = convertToEntity(planDto);
        Plan createdPlan = planService.createPlan(plan);
        PlanDto createdPlanDto = convertToDto(createdPlan);
        return ResponseEntity.ok(createdPlanDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlanDto> updatePlan(@PathVariable Long id, @RequestBody PlanDto planDto) {
        Plan planToUpdate = convertToEntity(planDto);
        Plan updatedPlan = planService.updatePlan(id, planToUpdate);
        PlanDto updatedPlanDto = convertToDto(updatedPlan);
        return ResponseEntity.ok(updatedPlanDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable Long id) {
        planService.deletePlan(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PlanDto>> getPlansByUserId(@PathVariable Long userId) {
        List<Plan> plans = planService.getPlansByUserId(userId);
        List<PlanDto> planDtos = plans.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(planDtos);
    }

    private PlanDto convertToDto(Plan plan) {
        return new PlanDto(plan.getId(), plan.getDate(), plan.getDescription(), plan.getUser().getId(), plan.getRealizationTime());
    }

    private Plan convertToEntity(PlanDto planDto) {
        Plan plan = new Plan();
        plan.setId(planDto.getId());
        plan.setDate(planDto.getDate());
        plan.setDescription(planDto.getDescription());
        plan.setRealizationTime(planDto.getRealizationTime());
        // Set user by fetching from database or however you manage it
        // plan.setUser(userService.getUserById(planDto.getUserId()));
        return plan;
    }
}
