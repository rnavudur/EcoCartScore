package com.walmart.ecocart.controller;

import com.walmart.ecocart.model.ProductMetadata;
import com.walmart.ecocart.repository.ProductMetadataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductMetadataController {

    @Autowired
    private ProductMetadataRepository repository;

    @GetMapping
    public List<ProductMetadata> getAllProducts() {
        return repository.findAll();
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductMetadata> getProduct(@PathVariable String productId) {
        Optional<ProductMetadata> product = repository.findByProductId(productId);
        return product.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ProductMetadata createProduct(@RequestBody ProductMetadata product) {
        return repository.save(product);
    }

    @PutMapping("/{productId}")
    public ResponseEntity<ProductMetadata> updateProduct(@PathVariable String productId, @RequestBody ProductMetadata updatedProduct) {
        Optional<ProductMetadata> existing = repository.findByProductId(productId);
        if (existing.isPresent()) {
            ProductMetadata product = existing.get();
            product.setName(updatedProduct.getName());
            product.setBrand(updatedProduct.getBrand());
            product.setCategory(updatedProduct.getCategory());
            product.setPackagingScore(updatedProduct.getPackagingScore());
            product.setSourcingScore(updatedProduct.getSourcingScore());
            product.setCarbonScore(updatedProduct.getCarbonScore());
            product.setRecyclabilityScore(updatedProduct.getRecyclabilityScore());
            product.setIsOrganic(updatedProduct.getIsOrganic());
            product.setIsLocal(updatedProduct.getIsLocal());
            product.setHasPlasticPackaging(updatedProduct.getHasPlasticPackaging());
            product.setPackagingType(updatedProduct.getPackagingType());
            product.setSourceCountry(updatedProduct.getSourceCountry());
            product.setCarbonFootprintKg(updatedProduct.getCarbonFootprintKg());
            product.setRecyclabilityInfo(updatedProduct.getRecyclabilityInfo());
            return ResponseEntity.ok(repository.save(product));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/category/{category}")
    public List<ProductMetadata> getProductsByCategory(@PathVariable String category) {
        return repository.findByCategory(category);
    }

    @GetMapping("/organic")
    public List<ProductMetadata> getOrganicProducts() {
        return repository.findByIsOrganic(true);
    }

    @GetMapping("/local")
    public List<ProductMetadata> getLocalProducts() {
        return repository.findByIsLocal(true);
    }
} 