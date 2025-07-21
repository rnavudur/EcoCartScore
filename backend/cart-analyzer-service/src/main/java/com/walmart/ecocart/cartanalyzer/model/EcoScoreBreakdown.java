package com.walmart.ecocart.cartanalyzer.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EcoScoreBreakdown {
    
    private Integer packaging;
    private Integer sourcing;
    private Integer carbon;
    private Integer recyclability;
} 