package com.walmart.ecocart.cartanalyzer.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartAnalysisRequest {
    
    @NotEmpty
    @Valid
    private List<CartItem> items;
    
    private String userId;
    private String sessionId;
} 