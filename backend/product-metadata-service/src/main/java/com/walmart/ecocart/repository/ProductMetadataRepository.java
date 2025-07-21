package com.walmart.ecocart.repository;

import com.walmart.ecocart.model.ProductMetadata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface ProductMetadataRepository extends JpaRepository<ProductMetadata, Long> {
    Optional<ProductMetadata> findByProductId(String productId);
    List<ProductMetadata> findByCategory(String category);
    List<ProductMetadata> findByBrand(String brand);
    List<ProductMetadata> findByIsOrganic(Boolean isOrganic);
    List<ProductMetadata> findByIsLocal(Boolean isLocal);
} 