-- PostgreSQL Database Setup Script for EcoCart
-- Run this as postgres superuser

-- Create user if not exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'ecocart_user') THEN
        CREATE USER ecocart_user WITH PASSWORD 'ecocart123';
    END IF;
END $$;

-- Create databases 
CREATE DATABASE ecocart_metadata OWNER ecocart_user;
CREATE DATABASE ecocart_cart OWNER ecocart_user;
CREATE DATABASE ecocart_rewards OWNER ecocart_user;

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE ecocart_metadata TO ecocart_user;
GRANT ALL PRIVILEGES ON DATABASE ecocart_cart TO ecocart_user;
GRANT ALL PRIVILEGES ON DATABASE ecocart_rewards TO ecocart_user;

-- Connect to ecocart_metadata database and create schema
\c ecocart_metadata;

-- Create product_metadata table
CREATE TABLE IF NOT EXISTS product_metadata (
    product_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    brand VARCHAR(100),
    category VARCHAR(100),
    packaging_score DECIMAL(3,2),
    sourcing_score DECIMAL(3,2),
    carbon_score DECIMAL(3,2),
    recyclability_score DECIMAL(3,2),
    is_organic BOOLEAN DEFAULT FALSE,
    is_local BOOLEAN DEFAULT FALSE,
    has_plastic_packaging BOOLEAN DEFAULT TRUE,
    packaging_type VARCHAR(100),
    source_country VARCHAR(100),
    carbon_footprint_kg DECIMAL(8,2),
    recyclability_info TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Grant table permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ecocart_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO ecocart_user; 