# EcoCart Score API Documentation

## Overview
EcoCart Score is a comprehensive green shopping feedback system built with Spring Boot microservices and React frontend. This document outlines all available APIs across the system.

## Base URLs
- **API Gateway**: `http://localhost:8080`
- **Product Metadata Service**: `http://localhost:8081`
- **Scoring Engine Service**: `http://localhost:8082`
- **Reward Service**: `http://localhost:8083`
- **Cart Analyzer Service**: `http://localhost:8084`

## Authentication
Currently, all APIs are open access. In production, implement JWT-based authentication.

---

## Cart Analyzer Service

### Analyze Cart
**POST** `/api/cart/analyze`

Analyzes a shopping cart and returns eco scores, recommendations, and rewards.

**Request Body:**
```json
{
  "items": [
    {
      "productId": "APPLE001",
      "name": "Organic Apples",
      "price": 4.99,
      "quantity": 2
    }
  ]
}
```

**Response:**
```json
{
  "ecoScore": 87,
  "grade": "A",
  "totalPrice": 9.98,
  "breakdown": {
    "packaging": 80,
    "sourcing": 95,
    "carbon": 85,
    "recyclability": 90
  },
  "recommendations": ["Great choices! Keep prioritizing organic products"],
  "badges": [{"name": "Green Shopper", "icon": "🌱"}],
  "greenPoints": 15
}
```

---

## Product Metadata Service

### Get All Products
**GET** `/api/products`

Returns all products with sustainability metadata.

### Get Product by ID
**GET** `/api/products/{productId}`

Returns specific product metadata.

**Response:**
```json
{
  "id": 1,
  "productId": "APPLE001",
  "name": "Organic Apples",
  "brand": "Local Farm",
  "category": "Produce",
  "packagingScore": 4.5,
  "sourcingScore": 5.0,
  "carbonScore": 4.0,
  "recyclabilityScore": 5.0,
  "isOrganic": true,
  "isLocal": true,
  "hasPlasticPackaging": false,
  "packagingType": "None",
  "sourceCountry": "USA",
  "carbonFootprintKg": 0,
  "recyclabilityInfo": "Compostable"
}
```

### Create Product
**POST** `/api/products`

Creates new product metadata.

### Update Product
**PUT** `/api/products/{productId}`

Updates existing product metadata.

### Get Products by Category
**GET** `/api/products/category/{category}`

### Get Organic Products
**GET** `/api/products/organic`

### Get Local Products
**GET** `/api/products/local`

---

## Scoring Engine Service

### Calculate Eco Score
**POST** `/api/scoring/calculate`

Calculates eco score based on product metadata.

**Request Body:**
```json
{
  "packagingScore": 4.5,
  "sourcingScore": 5.0,
  "carbonScore": 4.0,
  "recyclabilityScore": 5.0,
  "isOrganic": true,
  "isLocal": true,
  "hasPlasticPackaging": false
}
```

**Response:**
```json
{
  "ecoScore": 87,
  "grade": "A",
  "color": "#10B981",
  "breakdown": {
    "packaging": 90,
    "sourcing": 100,
    "carbon": 80,
    "recyclability": 100
  }
}
```

---

## Reward Service

### Calculate Rewards
**POST** `/api/rewards/calculate`

Calculates green points, badges, and discounts based on shopping behavior.

**Request Body:**
```json
{
  "ecoScore": 87,
  "totalItems": 5,
  "totalPrice": 45.99
}
```

**Response:**
```json
{
  "greenPoints": 69,
  "pointsBreakdown": {
    "basePoints": 46,
    "bonusPoints": 23
  },
  "badges": [
    {
      "name": "Eco Champion",
      "icon": "🏆",
      "description": "Outstanding eco-friendly shopping!"
    }
  ],
  "discount": {
    "percentage": 10,
    "message": "🎉 Congratulations! 10% off your next eco-friendly purchase!"
  },
  "recommendations": [
    "Excellent eco-friendly shopping! Keep it up!",
    "Share your green shopping tips with friends"
  ]
}
```

### Get User Badges
**GET** `/api/rewards/badges/{userId}`

### Get User Points
**GET** `/api/rewards/points/{userId}`

---

## Error Responses

All endpoints return standard HTTP status codes and error messages:

```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "status": 404,
  "error": "Not Found",
  "message": "Product not found",
  "path": "/api/products/INVALID"
}
```

## Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting
API Gateway implements rate limiting:
- 10 requests per second (replenish rate)
- Burst capacity of 20 requests

## Health Checks
All services expose health endpoints:
- `/actuator/health` - Service health status
- `/actuator/info` - Service information
- `/actuator/metrics` - Service metrics 