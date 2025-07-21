package com.walmart.ecocart.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/scoring")
@CrossOrigin(origins = "*")
public class ScoringController {

    @PostMapping("/calculate")
    public Map<String, Object> calculateEcoScore(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        
        // Extract product metadata
        Double packagingScore = (Double) request.getOrDefault("packagingScore", 3.0);
        Double sourcingScore = (Double) request.getOrDefault("sourcingScore", 3.0);
        Double carbonScore = (Double) request.getOrDefault("carbonScore", 3.0);
        Double recyclabilityScore = (Double) request.getOrDefault("recyclabilityScore", 3.0);
        
        Boolean isOrganic = (Boolean) request.getOrDefault("isOrganic", false);
        Boolean isLocal = (Boolean) request.getOrDefault("isLocal", false);
        Boolean hasPlasticPackaging = (Boolean) request.getOrDefault("hasPlasticPackaging", true);
        
        // Calculate weighted eco score (1-100 scale)
        double baseScore = (packagingScore + sourcingScore + carbonScore + recyclabilityScore) / 4.0;
        
        // Apply bonuses and penalties
        double finalScore = baseScore * 20; // Convert to 0-100 scale
        
        if (isOrganic) finalScore += 5;
        if (isLocal) finalScore += 5;
        if (!hasPlasticPackaging) finalScore += 3;
        
        // Cap at 100
        finalScore = Math.min(finalScore, 100);
        
        // Determine grade
        String grade = getGrade(finalScore);
        String color = getColor(finalScore);
        
        response.put("ecoScore", Math.round(finalScore));
        response.put("grade", grade);
        response.put("color", color);
        response.put("breakdown", Map.of(
            "packaging", Math.round(packagingScore * 20),
            "sourcing", Math.round(sourcingScore * 20),
            "carbon", Math.round(carbonScore * 20),
            "recyclability", Math.round(recyclabilityScore * 20)
        ));
        
        return response;
    }
    
    private String getGrade(double score) {
        if (score >= 90) return "A+";
        if (score >= 80) return "A";
        if (score >= 70) return "B";
        if (score >= 60) return "C";
        if (score >= 50) return "D";
        return "F";
    }
    
    private String getColor(double score) {
        if (score >= 80) return "#10B981"; // Green
        if (score >= 60) return "#F59E0B"; // Yellow
        return "#EF4444"; // Red
    }
} 