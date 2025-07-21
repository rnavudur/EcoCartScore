package com.walmart.ecocart.cartanalyzer.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "product-metadata-service", url = "${services.product-metadata.url:http://localhost:8082}")
public interface ProductMetadataClient {

    @GetMapping("/api/products/{productId}/metadata")
    ProductMetadata getProductMetadata(@PathVariable("productId") Long productId);
    
    // Placeholder inner class - will be moved to shared models later
    class ProductMetadata {
        public String packagingType;
        public String sourceLocation;
        public Double carbonFootprint;
        public Integer recyclabilityScore;
    }
} 