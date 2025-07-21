package com.walmart.ecocart.cartanalyzer.service;

import com.walmart.ecocart.cartanalyzer.model.*;
import com.walmart.ecocart.cartanalyzer.client.ProductMetadataClient;
import com.walmart.ecocart.cartanalyzer.client.ScoringEngineClient;
import com.walmart.ecocart.cartanalyzer.client.RewardServiceClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class CartAnalyzerService {

    private final ProductMetadataClient productMetadataClient;
    private final ScoringEngineClient scoringEngineClient;
    private final RewardServiceClient rewardServiceClient;

    public EcoScoreResponse analyzeCart(CartAnalysisRequest request) {
        log.info("Starting cart analysis for {} items", request.getItems().size());
        
        String analysisId = UUID.randomUUID().toString();
        
        try {
            // For now, implement a basic scoring algorithm
            // In a real implementation, this would call the microservices
            
            EcoScoreBreakdown breakdown = calculateEcoScoreBreakdown(request.getItems());
            int overallScore = calculateOverallScore(breakdown);
            
            List<String> recommendations = generateRecommendations(request.getItems(), breakdown);
            List<String> badges = generateBadges(request.getItems(), overallScore);
            int points = calculatePoints(overallScore, request.getItems().size());
            
            return EcoScoreResponse.builder()
                    .overallScore(overallScore)
                    .breakdown(breakdown)
                    .recommendations(recommendations)
                    .badges(badges)
                    .points(points)
                    .analysisId(analysisId)
                    .timestamp(Instant.now().toEpochMilli())
                    .build();
                    
        } catch (Exception e) {
            log.error("Error during cart analysis for analysisId: {}", analysisId, e);
            throw new RuntimeException("Cart analysis failed", e);
        }
    }

    private EcoScoreBreakdown calculateEcoScoreBreakdown(List<CartItem> items) {
        // Simplified scoring logic - in production this would call the Scoring Engine Service
        int packagingScore = calculatePackagingScore(items);
        int sourcingScore = calculateSourcingScore(items);
        int carbonScore = calculateCarbonScore(items);
        int recyclabilityScore = calculateRecyclabilityScore(items);
        
        return EcoScoreBreakdown.builder()
                .packaging(packagingScore)
                .sourcing(sourcingScore)
                .carbon(carbonScore)
                .recyclability(recyclabilityScore)
                .build();
    }

    private int calculatePackagingScore(List<CartItem> items) {
        // Basic algorithm - adjust based on product categories
        int score = 70; // Base score
        
        for (CartItem item : items) {
            if (item.getName().toLowerCase().contains("plastic")) {
                score -= 15;
            } else if (item.getName().toLowerCase().contains("reusable")) {
                score += 10;
            } else if (item.getCategory().equals("produce")) {
                score += 5;
            }
        }
        
        return Math.max(0, Math.min(100, score));
    }

    private int calculateSourcingScore(List<CartItem> items) {
        int score = 80; // Base score
        
        for (CartItem item : items) {
            if (item.getName().toLowerCase().contains("organic")) {
                score += 10;
            } else if (item.getName().toLowerCase().contains("local")) {
                score += 15;
            } else if (item.getCategory().equals("produce")) {
                score += 5;
            }
        }
        
        return Math.max(0, Math.min(100, score));
    }

    private int calculateCarbonScore(List<CartItem> items) {
        int score = 75; // Base score
        
        for (CartItem item : items) {
            if (item.getCategory().equals("meat")) {
                score -= 10;
            } else if (item.getCategory().equals("produce")) {
                score += 8;
            } else if (item.getName().toLowerCase().contains("plant")) {
                score += 12;
            }
        }
        
        return Math.max(0, Math.min(100, score));
    }

    private int calculateRecyclabilityScore(List<CartItem> items) {
        int score = 70; // Base score
        
        for (CartItem item : items) {
            if (item.getName().toLowerCase().contains("plastic")) {
                score -= 10;
            } else if (item.getName().toLowerCase().contains("glass")) {
                score += 15;
            } else if (item.getCategory().equals("produce")) {
                score += 10;
            }
        }
        
        return Math.max(0, Math.min(100, score));
    }

    private int calculateOverallScore(EcoScoreBreakdown breakdown) {
        return (breakdown.getPackaging() + breakdown.getSourcing() + 
                breakdown.getCarbon() + breakdown.getRecyclability()) / 4;
    }

    private List<String> generateRecommendations(List<CartItem> items, EcoScoreBreakdown breakdown) {
        List<String> recommendations = new ArrayList<>();
        
        if (breakdown.getPackaging() < 70) {
            recommendations.add("Switch to reusable water bottles to eliminate plastic waste");
        }
        
        if (breakdown.getCarbon() < 70) {
            recommendations.add("Consider plant-based alternatives for some meat products");
        }
        
        if (breakdown.getSourcing() > 80) {
            recommendations.add("Great choice on organic produce - keep it up!");
        }
        
        if (items.stream().anyMatch(item -> item.getCategory().equals("produce"))) {
            recommendations.add("Excellent selection of fresh produce for a healthy planet!");
        }
        
        return recommendations;
    }

    private List<String> generateBadges(List<CartItem> items, int overallScore) {
        List<String> badges = new ArrayList<>();
        
        if (items.stream().anyMatch(item -> item.getName().toLowerCase().contains("organic"))) {
            badges.add("Organic Supporter");
        }
        
        if (items.stream().anyMatch(item -> item.getName().toLowerCase().contains("local"))) {
            badges.add("Local Lover");
        }
        
        if (overallScore >= 80) {
            badges.add("Eco Champion");
        }
        
        if (items.stream().anyMatch(item -> item.getName().toLowerCase().contains("reusable"))) {
            badges.add("Waste Reducer");
        }
        
        return badges;
    }

    private int calculatePoints(int overallScore, int itemCount) {
        int basePoints = overallScore;
        int bonusPoints = itemCount * 5;
        return basePoints + bonusPoints;
    }
} 