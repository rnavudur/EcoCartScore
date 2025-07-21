# EcoCart Score – Green Shopping Feedback Tool

## Overview

EcoCart Score is an intelligent sustainability scoring system that analyzes a customer's shopping cart and provides real-time "eco scores" after checkout. The system evaluates environmental friendliness based on:

- **Product Packaging**: Plastic vs. biodegradable materials
- **Sourcing**: Local vs. imported products  
- **Carbon Impact**: Plant-based vs. red meat products
- **Recyclability**: Product recyclability scores

## Architecture

### Frontend
- **ReactJS**: Eco score dashboard and post-checkout feedback
- **TailwindCSS**: Clean, responsive styling
- **Axios**: Backend API communication

### Backend (Microservices)
- **Cart Analyzer Service**: Orchestrates eco scoring process
- **Product Metadata Service**: Stores sustainability data
- **Scoring Engine Service**: Applies eco scoring algorithms
- **Reward Service**: Manages badges, discounts, and loyalty points
- **Eco Insights Service**: Analytics and trend tracking

### Infrastructure
- **Spring Cloud Gateway**: API routing and authentication
- **PostgreSQL**: Product metadata and user data storage
- **Docker**: Service containerization
- **Kubernetes/AWS ECS**: Microservices orchestration

## Project Structure

```
EcoCartScore/
├── frontend/                    # React application
├── backend/                     # Spring Boot microservices
│   ├── cart-analyzer-service/
│   ├── product-metadata-service/
│   ├── scoring-engine-service/
│   ├── reward-service/
│   ├── eco-insights-service/
│   └── api-gateway/
├── docker/                      # Docker configurations
├── k8s/                         # Kubernetes manifests
└── docs/                        # Documentation

```

## Quick Start

### Prerequisites
- Node.js 18+
- Java 17+
- Maven 3.8+
- Docker & Docker Compose
- PostgreSQL 14+

### Development Setup

1. **Clone and setup**
   ```bash
   git clone <repository-url>
   cd EcoCartScore
   ```

2. **Start backend services**
   ```bash
   docker-compose up -d
   ```

3. **Start frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - API Gateway: http://localhost:8080

## Features

✅ **Real-time Eco Scoring**: Instant sustainability feedback  
✅ **Product Analysis**: Comprehensive environmental impact assessment  
✅ **Reward System**: Badges, discounts, and loyalty points  
✅ **Analytics Dashboard**: Track sustainability trends  
✅ **Personalized Recommendations**: Suggest eco-friendly alternatives  

## Benefits for Walmart

- **ESG Compliance**: Supports sustainability and environmental goals
- **Customer Engagement**: Gamified eco-friendly shopping experience
- **Data Insights**: Customer sustainability trend analytics
- **Brand Differentiation**: Leadership in responsible retail
- **Revenue Growth**: Increased sales of sustainable products

## API Documentation

Detailed API documentation is available at `/docs/api.md` after starting the services.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is proprietary to Walmart Inc. 