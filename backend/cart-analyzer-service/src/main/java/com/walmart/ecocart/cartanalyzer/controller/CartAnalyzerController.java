package com.walmart.ecocart.cartanalyzer.controller;

import com.walmart.ecocart.cartanalyzer.model.CartAnalysisRequest;
import com.walmart.ecocart.cartanalyzer.model.EcoScoreResponse;
import com.walmart.ecocart.cartanalyzer.service.CartAnalyzerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class CartAnalyzerController {

    private final CartAnalyzerService cartAnalyzerService;

    @PostMapping("/analyze")
    public ResponseEntity<EcoScoreResponse> analyzeCart(@Valid @RequestBody CartAnalysisRequest request) {
        log.info("Received cart analysis request for {} items", request.getItems().size());
        
        try {
            EcoScoreResponse response = cartAnalyzerService.analyzeCart(request);
            log.info("Cart analysis completed with overall score: {}", response.getOverallScore());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error analyzing cart", e);
            throw e;
        }
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Cart Analyzer Service is healthy");
    }
} 