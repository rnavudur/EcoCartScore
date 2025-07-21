-- EcoCart Score Database Initialization Script

-- Create databases
CREATE DATABASE ecocart_main;
CREATE DATABASE ecocart_metadata;
CREATE DATABASE ecocart_rewards;

-- Create user
CREATE USER ecocart_user WITH PASSWORD 'ecocart_pass';

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE ecocart_main TO ecocart_user;
GRANT ALL PRIVILEGES ON DATABASE ecocart_metadata TO ecocart_user;
GRANT ALL PRIVILEGES ON DATABASE ecocart_rewards TO ecocart_user;

-- Connect to metadata database and create sample data
\c ecocart_metadata;

-- Product metadata table will be created by Hibernate, but let's insert sample data
INSERT INTO product_metadata (product_id, name, brand, category, packaging_score, sourcing_score, carbon_score, recyclability_score, is_organic, is_local, has_plastic_packaging, packaging_type, source_country, carbon_footprint_kg, recyclability_info) VALUES
('APPLE001', 'Organic Apples', 'Local Farm', 'Produce', 4.5, 5.0, 4.0, 5.0, true, true, false, 'None', 'USA', 0, 'Compostable'),
('BREAD001', 'Whole Wheat Bread', 'Bakery Fresh', 'Bakery', 3.0, 3.5, 3.0, 4.0, false, true, true, 'Plastic bag', 'USA', 1, 'Recyclable plastic'),
('MILK001', 'Organic Milk', 'Valley Dairy', 'Dairy', 4.0, 4.5, 3.5, 3.0, true, false, false, 'Glass bottle', 'USA', 2, 'Returnable glass'),
('CHIPS001', 'Potato Chips', 'Snack Co', 'Snacks', 2.0, 2.5, 2.0, 2.0, false, false, true, 'Plastic bag', 'Mexico', 3, 'Not recyclable'),
('SALAD001', 'Mixed Greens', 'Organic Gardens', 'Produce', 4.0, 5.0, 4.5, 4.5, true, true, true, 'Plastic container', 'USA', 0, 'Recyclable plastic');

-- Connect to rewards database
\c ecocart_rewards;

-- User rewards table (sample structure)
CREATE TABLE IF NOT EXISTS user_rewards (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    total_points INTEGER DEFAULT 0,
    monthly_points INTEGER DEFAULT 0,
    badges JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample user data
INSERT INTO user_rewards (user_id, total_points, monthly_points, badges) VALUES
('user123', 1250, 320, '[{"name": "Green Shopper", "icon": "🌱"}, {"name": "Earth Friend", "icon": "🌍"}]'),
('user456', 890, 180, '[{"name": "Earth Friend", "icon": "🌍"}]'); 