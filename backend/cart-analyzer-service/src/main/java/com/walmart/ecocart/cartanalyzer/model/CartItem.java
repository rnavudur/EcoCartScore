package com.walmart.ecocart.cartanalyzer.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {
    
    @NotNull
    private Long id;
    
    @NotBlank
    private String name;
    
    @NotNull
    @Positive
    private Integer quantity;
    
    @NotNull
    @Positive
    private BigDecimal price;
    
    @NotBlank
    private String category;
} 