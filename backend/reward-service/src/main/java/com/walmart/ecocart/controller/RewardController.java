package com.walmart.ecocart.controller;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/rewards")
@CrossOrigin(origins = "*")
public class RewardController {

    @PostMapping("/calculate")
    public Map<String, Object> calculateRewards(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        
        Integer ecoScore = (Integer) request.getOrDefault("ecoScore", 50);
        Integer totalItems = (Integer) request.getOrDefault("totalItems", 1);
        Double totalPrice = (Double) request.getOrDefault("totalPrice", 100.0);
        
        // Calculate green points (1 point per dollar + bonus for eco score)
        int basePoints = totalPrice.intValue();
        int bonusPoints = ecoScore > 80 ? basePoints / 2 : ecoScore > 60 ? basePoints / 4 : 0;
        int totalPoints = basePoints + bonusPoints;
        
        // Generate badges based on eco score
        List<Map<String, String>> badges = new ArrayList<>();
        if (ecoScore >= 90) {
            badges.add(Map.of("name", "Eco Champion", "icon", "🏆", "description", "Outstanding eco-friendly shopping!"));
        }
        if (ecoScore >= 80) {
            badges.add(Map.of("name", "Green Shopper", "icon", "🌱", "description", "Great eco-conscious choices!"));
        }
        if (ecoScore >= 70) {
            badges.add(Map.of("name", "Earth Friend", "icon", "🌍", "description", "Good sustainability choices!"));
        }
        
        // Calculate discounts
        double discountPercentage = 0;
        String discountMessage = "";
        if (ecoScore >= 85) {
            discountPercentage = 10;
            discountMessage = "🎉 Congratulations! 10% off your next eco-friendly purchase!";
        } else if (ecoScore >= 75) {
            discountPercentage = 5;
            discountMessage = "🌟 Great job! 5% off your next green purchase!";
        }
        
        // Generate recommendations
        List<String> recommendations = new ArrayList<>();
        if (ecoScore < 60) {
            recommendations.add("Try choosing more organic products");
            recommendations.add("Look for items with minimal packaging");
            recommendations.add("Consider local and seasonal products");
        } else if (ecoScore < 80) {
            recommendations.add("You're doing great! Try reducing plastic packaging further");
            recommendations.add("Consider adding more locally-sourced items");
        } else {
            recommendations.add("Excellent eco-friendly shopping! Keep it up!");
            recommendations.add("Share your green shopping tips with friends");
        }
        
        response.put("greenPoints", totalPoints);
        response.put("pointsBreakdown", Map.of(
            "basePoints", basePoints,
            "bonusPoints", bonusPoints
        ));
        response.put("badges", badges);
        response.put("discount", Map.of(
            "percentage", discountPercentage,
            "message", discountMessage
        ));
        response.put("recommendations", recommendations);
        
        return response;
    }
    
    @GetMapping("/badges/{userId}")
    public List<Map<String, String>> getUserBadges(@PathVariable String userId) {
        // Mock implementation - in real app would fetch from database
        return List.of(
            Map.of("name", "Green Shopper", "icon", "🌱", "description", "Great eco-conscious choices!"),
            Map.of("name", "Earth Friend", "icon", "🌍", "description", "Good sustainability choices!")
        );
    }
    
    @GetMapping("/points/{userId}")
    public Map<String, Object> getUserPoints(@PathVariable String userId) {
        // Mock implementation
        return Map.of(
            "totalPoints", 1250,
            "monthlyPoints", 320,
            "rank", "Eco Warrior"
        );
    }
} 