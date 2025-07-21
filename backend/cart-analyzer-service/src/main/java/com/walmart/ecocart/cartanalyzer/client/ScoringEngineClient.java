package com.walmart.ecocart.cartanalyzer.client;

import com.walmart.ecocart.cartanalyzer.model.CartItem;
import com.walmart.ecocart.cartanalyzer.model.EcoScoreBreakdown;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "scoring-engine-service", url = "${services.scoring-engine.url:http://localhost:8083}")
public interface ScoringEngineClient {

    @PostMapping("/api/scoring/calculate")
    EcoScoreBreakdown calculateEcoScore(@RequestBody List<CartItem> items);
} 