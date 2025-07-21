package com.walmart.ecocart.cartanalyzer.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "reward-service", url = "${services.reward.url:http://localhost:8084}")
public interface RewardServiceClient {

    @PostMapping("/api/rewards/badges")
    List<String> generateBadges(@RequestBody BadgeRequest request);
    
    @PostMapping("/api/rewards/points")
    Integer calculatePoints(@RequestBody PointsRequest request);
    
    // Placeholder inner classes - will be moved to shared models later
    class BadgeRequest {
        public List<String> categories;
        public Integer ecoScore;
        public String userId;
    }
    
    class PointsRequest {
        public Integer ecoScore;
        public Integer itemCount;
        public String userId;
    }
} 