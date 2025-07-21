package com.walmart.ecocart.cartanalyzer.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EcoScoreResponse {
    
    private Integer overallScore;
    private EcoScoreBreakdown breakdown;
    private List<String> recommendations;
    private List<String> badges;
    private Integer points;
    private String analysisId;
    private Long timestamp;
} 