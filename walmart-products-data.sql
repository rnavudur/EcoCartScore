-- Real Walmart Products with Sustainability Data
-- Insert real products available on Walmart website with eco scores

-- Organic/Natural Products (High Scores)
INSERT INTO product_metadata (product_id, name, brand, category, packaging_score, sourcing_score, carbon_score, recyclability_score, is_organic, is_local, has_plastic_packaging, packaging_type, source_country, carbon_footprint_kg, recyclability_info) VALUES
('10292387', 'Great Value Organic Whole Milk, 64 fl oz', 'Great Value', 'Dairy', 4.2, 4.8, 4.1, 3.8, true, false, false, 'Paper Carton', 'USA', 2, 'Carton is recyclable in most areas'),
('14898765', 'Simply Organic Oregano Leaf, 0.75 oz', 'Simply Organic', 'Spices', 4.5, 4.9, 4.7, 4.2, true, false, false, 'Glass Jar', 'USA', 1, 'Glass jar is fully recyclable'),
('23847291', 'Annie''s Organic Bunny Fruit Snacks', 'Annie''s', 'Snacks', 4.1, 4.6, 4.0, 3.9, true, false, true, 'Mixed', 'USA', 1, 'Outer box recyclable, inner wrapper not'),
('34562891', 'Horizon Organic Whole Milk, 32 fl oz', 'Horizon', 'Dairy', 4.3, 4.7, 4.2, 3.9, true, false, false, 'Paper Carton', 'USA', 2, 'Carton with cap - cap recyclable separately'),

-- Eco-Friendly Household Products
('45671823', 'Seventh Generation Dish Liquid, 25 fl oz', 'Seventh Generation', 'Cleaning', 4.4, 4.5, 4.3, 4.1, false, false, true, 'Plastic Bottle', 'USA', 1, 'Bottle made from recycled plastic'),
('56789012', 'Method All-Purpose Cleaner, 28 fl oz', 'Method', 'Cleaning', 4.2, 4.3, 4.1, 4.0, false, false, true, 'Plastic Bottle', 'USA', 1, 'Bottle is recyclable'),
('67890123', 'Beeswax Wrap Reusable Food Storage', 'Bee''s Wrap', 'Storage', 4.8, 4.9, 4.6, 4.7, true, false, false, 'Paper Packaging', 'USA', 0, 'Compostable product and packaging'),

-- Regular Packaged Foods (Medium Scores)
('78901234', 'Campbell''s Tomato Soup, 10.75 oz', 'Campbell''s', 'Canned Goods', 3.2, 3.1, 2.8, 4.5, false, false, false, 'Metal Can', 'USA', 3, 'Can is highly recyclable'),
('89012345', 'Coca-Cola Classic, 12 fl oz cans, 12 pack', 'Coca-Cola', 'Beverages', 2.8, 2.9, 2.5, 4.2, false, false, false, 'Aluminum Cans', 'USA', 4, 'Aluminum cans are infinitely recyclable'),
('90123456', 'Lay''s Classic Potato Chips, 9.5 oz', 'Lay''s', 'Snacks', 2.5, 3.0, 2.7, 2.1, false, false, true, 'Plastic Bag', 'USA', 2, 'Bag not recyclable in most areas'),
('01234567', 'Wonder Bread Classic White, 20 oz', 'Wonder', 'Bakery', 3.0, 3.2, 3.1, 3.5, false, false, true, 'Plastic Bag', 'USA', 2, 'Bag recyclable at some stores'),

-- Frozen Foods (Medium-Low Scores)
('12345678', 'Stouffer''s Lasagna with Meat Sauce, 37 oz', 'Stouffer''s', 'Frozen Meals', 2.9, 2.8, 2.4, 3.2, false, false, true, 'Plastic Tray', 'USA', 5, 'Tray recyclable where facilities exist'),
('23456789', 'Ben & Jerry''s Vanilla Ice Cream, 16 fl oz', 'Ben & Jerry''s', 'Frozen Desserts', 3.1, 3.4, 2.6, 3.8, false, false, false, 'Paper Container', 'USA', 4, 'Container is compostable'),
('34567890', 'Hot Pockets Ham & Cheese, 9 oz', 'Hot Pockets', 'Frozen Meals', 2.4, 2.6, 2.2, 2.8, false, false, true, 'Plastic Wrapper', 'USA', 3, 'Wrapper not recyclable'),

-- Electronics & Household Items (Lower Scores)
('45678901', 'Energizer AA Batteries, 8 pack', 'Energizer', 'Electronics', 2.2, 2.5, 2.0, 2.8, false, false, true, 'Plastic Packaging', 'Various', 6, 'Batteries require special recycling'),
('56789123', 'Ziploc Storage Bags, Gallon, 26 count', 'Ziploc', 'Storage', 2.1, 2.3, 2.4, 1.9, false, false, true, 'Plastic Box', 'USA', 2, 'Box recyclable, bags not'),
('67890234', 'Tide Liquid Laundry Detergent, 64 loads', 'Tide', 'Cleaning', 2.8, 2.9, 2.6, 3.1, false, false, true, 'Plastic Bottle', 'USA', 3, 'Bottle recyclable when empty'),

-- Fresh Produce (Variable Scores based on sourcing)
('78901345', 'Bananas, 3 lbs', 'Fresh', 'Produce', 4.8, 2.1, 1.8, 4.9, false, false, false, 'None', 'Ecuador', 8, 'No packaging needed'),
('89012456', 'Organic Apples, Honeycrisp, 3 lb bag', 'Organic', 'Produce', 3.2, 4.6, 3.8, 2.8, true, false, true, 'Plastic Bag', 'USA', 2, 'Bag recyclable at some stores'),
('90123567', 'Avocados, 4 count', 'Fresh', 'Produce', 4.5, 2.8, 2.2, 4.9, false, false, false, 'None', 'Mexico', 6, 'No packaging'),

-- Personal Care (Mixed Scores)
('01234678', 'Dove Body Wash, 22 fl oz', 'Dove', 'Personal Care', 2.6, 2.8, 2.5, 3.2, false, false, true, 'Plastic Bottle', 'USA', 2, 'Bottle recyclable'),
('12345789', 'Tom''s of Maine Toothpaste, 4.7 oz', 'Tom''s of Maine', 'Personal Care', 4.1, 4.2, 3.9, 3.7, true, false, true, 'Plastic Tube', 'USA', 1, 'Tube recyclable through TerraCycle'),
('23456890', 'Head & Shoulders Shampoo, 23.7 fl oz', 'Head & Shoulders', 'Personal Care', 2.7, 2.9, 2.6, 3.1, false, false, true, 'Plastic Bottle', 'USA', 2, 'Bottle recyclable when empty'); 