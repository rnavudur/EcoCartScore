package com.walmart.ecocart.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;

@Entity
@Table(name = "product_metadata")
public class ProductMetadata {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Column(unique = true, nullable = false)
    private String productId;
    
    @NotBlank
    @Column(nullable = false)
    private String name;
    
    @Column
    private String brand;
    
    @Column
    private String category;
    
    @DecimalMin("0.0")
    @DecimalMax("5.0")
    @Column(nullable = false)
    private Double packagingScore = 3.0; // 1=worst, 5=best
    
    @DecimalMin("0.0")
    @DecimalMax("5.0")
    @Column(nullable = false)
    private Double sourcingScore = 3.0;
    
    @DecimalMin("0.0")
    @DecimalMax("5.0")
    @Column(nullable = false)
    private Double carbonScore = 3.0;
    
    @DecimalMin("0.0")
    @DecimalMax("5.0")
    @Column(nullable = false)
    private Double recyclabilityScore = 3.0;
    
    @Column
    private Boolean isOrganic = false;
    
    @Column
    private Boolean isLocal = false;
    
    @Column
    private Boolean hasPlasticPackaging = true;
    
    @Column
    private String packagingType = "Mixed";
    
    @Column
    private String sourceCountry = "USA";
    
    @Column
    private Integer carbonFootprintKg = 1;
    
    @Column
    private String recyclabilityInfo = "Standard recycling guidelines apply";
    
    // Constructors
    public ProductMetadata() {}
    
    public ProductMetadata(String productId, String name) {
        this.productId = productId;
        this.name = name;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public Double getPackagingScore() { return packagingScore; }
    public void setPackagingScore(Double packagingScore) { this.packagingScore = packagingScore; }
    
    public Double getSourcingScore() { return sourcingScore; }
    public void setSourcingScore(Double sourcingScore) { this.sourcingScore = sourcingScore; }
    
    public Double getCarbonScore() { return carbonScore; }
    public void setCarbonScore(Double carbonScore) { this.carbonScore = carbonScore; }
    
    public Double getRecyclabilityScore() { return recyclabilityScore; }
    public void setRecyclabilityScore(Double recyclabilityScore) { this.recyclabilityScore = recyclabilityScore; }
    
    public Boolean getIsOrganic() { return isOrganic; }
    public void setIsOrganic(Boolean isOrganic) { this.isOrganic = isOrganic; }
    
    public Boolean getIsLocal() { return isLocal; }
    public void setIsLocal(Boolean isLocal) { this.isLocal = isLocal; }
    
    public Boolean getHasPlasticPackaging() { return hasPlasticPackaging; }
    public void setHasPlasticPackaging(Boolean hasPlasticPackaging) { this.hasPlasticPackaging = hasPlasticPackaging; }
    
    public String getPackagingType() { return packagingType; }
    public void setPackagingType(String packagingType) { this.packagingType = packagingType; }
    
    public String getSourceCountry() { return sourceCountry; }
    public void setSourceCountry(String sourceCountry) { this.sourceCountry = sourceCountry; }
    
    public Integer getCarbonFootprintKg() { return carbonFootprintKg; }
    public void setCarbonFootprintKg(Integer carbonFootprintKg) { this.carbonFootprintKg = carbonFootprintKg; }
    
    public String getRecyclabilityInfo() { return recyclabilityInfo; }
    public void setRecyclabilityInfo(String recyclabilityInfo) { this.recyclabilityInfo = recyclabilityInfo; }
} 