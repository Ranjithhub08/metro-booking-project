-- Create database
CREATE DATABASE IF NOT EXISTS metro_pass;
USE metro_pass;

-- =====================================================
-- TABLE 1: users - Store user account information
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    phone_number VARCHAR(15),
    city VARCHAR(50),
    role ENUM('user', 'admin') DEFAULT 'user',
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_city (city),
    INDEX idx_is_active (is_active)
);

-- =====================================================
-- TABLE 2: cities - Store metro city information
-- =====================================================
CREATE TABLE IF NOT EXISTS cities (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    state VARCHAR(50),
    country VARCHAR(50) DEFAULT 'India',
    timezone VARCHAR(50) DEFAULT 'Asia/Kolkata',
    total_stations INT DEFAULT 0,
    total_lines INT DEFAULT 0,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    official_website VARCHAR(200),
    contact_email VARCHAR(100),
    contact_phone VARCHAR(20),
    metro_data JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_code (code),
    INDEX idx_is_active (is_active)
);

-- =====================================================
-- TABLE 3: stations - Store metro station details
-- =====================================================
CREATE TABLE IF NOT EXISTS stations (
    id VARCHAR(50) PRIMARY KEY,
    city_id VARCHAR(50) NOT NULL,
    line_id VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    x_coordinate INT,  -- For SVG visualization
    y_coordinate INT,  -- For SVG visualization
    station_type ENUM('elevated', 'underground', 'at-grade') DEFAULT 'elevated',
    parking_available BOOLEAN DEFAULT FALSE,
    wheelchair_accessible BOOLEAN DEFAULT TRUE,
    food_court_available BOOLEAN DEFAULT FALSE,
    restroom_available BOOLEAN DEFAULT TRUE,
    is_interchange BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE,
    INDEX idx_city_id (city_id),
    INDEX idx_line_id (line_id),
    INDEX idx_name (name),
    INDEX idx_is_interchange (is_interchange),
    UNIQUE KEY unique_station_city (city_id, name),
    INDEX idx_coordinates (x_coordinate, y_coordinate)
);

-- =====================================================
-- TABLE 4: metro_lines - Store metro line information
-- =====================================================
CREATE TABLE IF NOT EXISTS metro_lines (
    id VARCHAR(50) PRIMARY KEY,
    city_id VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    color VARCHAR(20) NOT NULL,
    line_type ENUM('normal', 'airport', 'express', 'circular') DEFAULT 'normal',
    total_stations INT DEFAULT 0,
    total_distance DECIMAL(10, 2),
    start_station VARCHAR(100),
    end_station VARCHAR(100),
    operating_hours_start TIME,
    operating_hours_end TIME,
    peak_frequency INT, -- in minutes
    off_peak_frequency INT, -- in minutes
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE,
    INDEX idx_city_id (city_id),
    INDEX idx_color (color),
    INDEX idx_is_active (is_active),
    UNIQUE KEY unique_line_city (city_id, name)
);

-- =====================================================
-- TABLE 5: bookings - Store ticket booking records
-- =====================================================
CREATE TABLE IF NOT EXISTS bookings (
    id VARCHAR(50) PRIMARY KEY,
    booking_reference VARCHAR(50) UNIQUE NOT NULL,
    user_id INT NOT NULL,
    city_id VARCHAR(50) NOT NULL,
    source_station_id VARCHAR(50) NOT NULL,
    destination_station_id VARCHAR(50) NOT NULL,
    source_station_name VARCHAR(100) NOT NULL,
    destination_station_name VARCHAR(100) NOT NULL,
    fare DECIMAL(10, 2) NOT NULL,
    stops INT NOT NULL,
    travel_time VARCHAR(20) NOT NULL,
    travel_minutes INT, -- Travel time in minutes for calculations
    route_path JSON, -- Store the complete route path
    interchanges JSON, -- Store interchange stations
    booking_date DATE NOT NULL,
    travel_date DATE NOT NULL,
    travel_time_slot VARCHAR(20), -- Morning, Afternoon, Evening, Night
    passenger_count INT DEFAULT 1,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('card', 'upi', 'wallet', 'netbanking') DEFAULT 'card',
    payment_id VARCHAR(100),
    payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    booking_status ENUM('confirmed', 'cancelled', 'completed', 'expired') DEFAULT 'confirmed',
    qr_code TEXT, -- Store QR code as base64 or URL
    cancellation_reason TEXT,
    cancelled_at TIMESTAMP NULL,
    timestamp BIGINT NOT NULL, -- Unix timestamp for ordering
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE,
    FOREIGN KEY (source_station_id) REFERENCES stations(id),
    FOREIGN KEY (destination_station_id) REFERENCES stations(id),
    INDEX idx_user_id (user_id),
    INDEX idx_city_id (city_id),
    INDEX idx_booking_reference (booking_reference),
    INDEX idx_booking_status (booking_status),
    INDEX idx_payment_status (payment_status),
    INDEX idx_booking_date (booking_date),
    INDEX idx_travel_date (travel_date),
    INDEX idx_timestamp (timestamp DESC),
    INDEX idx_user_status (user_id, booking_status),
    INDEX idx_date_range (travel_date, booking_status)
);

-- =====================================================
-- TABLE 6: payments - Store payment transaction details
-- =====================================================
CREATE TABLE IF NOT EXISTS payments (
    id VARCHAR(50) PRIMARY KEY,
    booking_id VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    transaction_id VARCHAR(100) UNIQUE,
    payment_method ENUM('card', 'upi', 'wallet', 'netbanking') NOT NULL,
    card_last_four VARCHAR(4),
    upi_id VARCHAR(100),
    wallet_type VARCHAR(50),
    payment_status ENUM('pending', 'success', 'failed', 'refunded') DEFAULT 'pending',
    refund_amount DECIMAL(10, 2) DEFAULT 0,
    refund_transaction_id VARCHAR(100),
    payment_gateway_response JSON,
    error_message TEXT,
    gateway VARCHAR(50) DEFAULT 'demo',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_booking_id (booking_id),
    INDEX idx_user_id (user_id),
    INDEX idx_transaction_id (transaction_id),
    INDEX idx_payment_status (payment_status),
    INDEX idx_payment_date (payment_date),
    INDEX idx_gateway (gateway)
);

-- =====================================================
-- Additional Supporting Tables (Views, Procedures, Triggers)
-- =====================================================

-- Create a view for active bookings
CREATE OR REPLACE VIEW active_bookings_view AS
SELECT 
    b.id,
    b.booking_reference,
    u.username,
    u.full_name,
    b.source_station_name,
    b.destination_station_name,
    b.fare,
    b.travel_date,
    b.booking_status,
    b.created_at
FROM bookings b
JOIN users u ON b.user_id = u.id
WHERE b.booking_status = 'confirmed' 
  AND b.travel_date >= CURDATE()
ORDER BY b.travel_date ASC;

-- Create a view for user statistics
CREATE OR REPLACE VIEW user_statistics_view AS
SELECT 
    u.id AS user_id,
    u.username,
    COUNT(b.id) AS total_bookings,
    SUM(b.total_amount) AS total_spent,
    AVG(b.fare) AS avg_fare,
    COUNT(DISTINCT b.city_id) AS cities_visited,
    MAX(b.travel_date) AS last_travel_date,
    SUM(CASE WHEN b.booking_status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_bookings
FROM users u
LEFT JOIN bookings b ON u.id = b.user_id
WHERE b.booking_status IN ('confirmed', 'completed')
GROUP BY u.id, u.username;

-- Create a view for daily revenue
CREATE OR REPLACE VIEW daily_revenue_view AS
SELECT 
    DATE(b.created_at) AS revenue_date,
    COUNT(b.id) AS total_bookings,
    SUM(b.total_amount) AS total_revenue,
    AVG(b.total_amount) AS avg_ticket_price,
    COUNT(DISTINCT b.city_id) AS cities_active,
    SUM(CASE WHEN b.payment_method = 'card' THEN b.total_amount ELSE 0 END) AS card_revenue,
    SUM(CASE WHEN b.payment_method = 'upi' THEN b.total_amount ELSE 0 END) AS upi_revenue,
    SUM(CASE WHEN b.payment_method = 'wallet' THEN b.total_amount ELSE 0 END) AS wallet_revenue
FROM bookings b
WHERE b.payment_status = 'completed' 
  AND b.booking_status = 'confirmed'
GROUP BY DATE(b.created_at)
ORDER BY revenue_date DESC;

-- Procedure to generate booking reference
DELIMITER //
CREATE PROCEDURE generate_booking_reference(
    IN user_id INT,
    IN city_code VARCHAR(10),
    OUT booking_ref VARCHAR(50)
)
BEGIN
    DECLARE seq_num INT;
    DECLARE date_part VARCHAR(20);
    
    SET date_part = DATE_FORMAT(NOW(), '%Y%m%d%H%i%s');
    SET seq_num = FLOOR(RAND() * 10000);
    SET booking_ref = CONCAT(city_code, 'MP', date_part, LPAD(seq_num, 4, '0'));
END//
DELIMITER ;

-- Trigger to update city station count when new station added
DELIMITER //
CREATE TRIGGER update_city_station_count
AFTER INSERT ON stations
FOR EACH ROW
BEGIN
    UPDATE cities 
    SET total_stations = (
        SELECT COUNT(*) FROM stations WHERE city_id = NEW.city_id AND is_active = TRUE
    )
    WHERE id = NEW.city_id;
END//
DELIMITER ;

-- Trigger to update line station count when new station added
DELIMITER //
CREATE TRIGGER update_line_station_count
AFTER INSERT ON stations
FOR EACH ROW
BEGIN
    UPDATE metro_lines 
    SET total_stations = (
        SELECT COUNT(*) FROM stations WHERE line_id = NEW.line_id AND is_active = TRUE
    )
    WHERE id = NEW.line_id;
END//
DELIMITER ;

-- Trigger to automatically update booking status based on travel date
DELIMITER //
CREATE TRIGGER update_booking_status_before_update
BEFORE UPDATE ON bookings
FOR EACH ROW
BEGIN
    IF NEW.travel_date < CURDATE() AND NEW.booking_status = 'confirmed' THEN
        SET NEW.booking_status = 'completed';
    END IF;
END//
DELIMITER ;

-- =====================================================
-- Insert Sample Data
-- =====================================================

-- Insert cities
INSERT INTO cities (id, name, code, state, total_stations, total_lines, official_website, metro_data) VALUES 
('hyderabad', 'Hyderabad Metro', 'HYD', 'Telangana', 27, 3, 'https://www.ltmetro.com', 
 '{"name":"Hyderabad Metro","lines":{"red":{"name":"Red Line","color":"#ef4444"},"blue":{"name":"Blue Line","color":"#3b82f6"},"green":{"name":"Green Line","color":"#10b981"}},"stations":[{"id":"mgbs","name":"MGBS","line":"red","x":100,"y":200},{"id":"ameerpet","name":"Ameerpet","line":"red","x":180,"y":200},{"id":"sr nagar","name":"SR Nagar","line":"red","x":260,"y":200}]}'),
('chennai', 'Chennai Metro', 'CHE', 'Tamil Nadu', 30, 2, 'https://chennaimetrorail.org', 
 '{"name":"Chennai Metro","lines":{"blue":{"name":"Blue Line","color":"#3b82f6"},"green":{"name":"Green Line","color":"#10b981"}},"stations":[{"id":"central","name":"Central","line":"blue","x":100,"y":200},{"id":"egmore","name":"Egmore","line":"blue","x":180,"y":200}]}'),
('bengaluru', 'Namma Metro', 'BLR', 'Karnataka', 33, 2, 'https://english.bmrc.co.in', 
 '{"name":"Bengaluru Metro","lines":{"purple":{"name":"Purple Line","color":"#8b5cf6"},"green":{"name":"Green Line","color":"#10b981"}},"stations":[{"id":"majestic","name":"Majestic","line":"purple","x":100,"y":200},{"id":"mg road","name":"MG Road","line":"purple","x":180,"y":200}]}');

-- Insert metro lines
INSERT INTO metro_lines (id, city_id, name, color, total_stations) VALUES
('hyd_red', 'hyderabad', 'Red Line', '#ef4444', 12),
('hyd_blue', 'hyderabad', 'Blue Line', '#3b82f6', 8),
('hyd_green', 'hyderabad', 'Green Line', '#10b981', 7),
('che_blue', 'chennai', 'Blue Line', '#3b82f6', 15),
('che_green', 'chennai', 'Green Line', '#10b981', 15),
('blr_purple', 'bengaluru', 'Purple Line', '#8b5cf6', 17),
('blr_green', 'bengaluru', 'Green Line', '#10b981', 16);

-- Insert stations (sample data)
INSERT INTO stations (id, city_id, line_id, name, code, x_coordinate, y_coordinate, station_type, parking_available) VALUES
('mgbs', 'hyderabad', 'hyd_red', 'MGBS', 'MGBS', 100, 200, 'elevated', TRUE),
('ameerpet', 'hyderabad', 'hyd_red', 'Ameerpet', 'AMRP', 180, 200, 'elevated', TRUE),
('sr_nagar', 'hyderabad', 'hyd_red', 'SR Nagar', 'SRNG', 260, 200, 'elevated', FALSE),
('central', 'chennai', 'che_blue', 'Central', 'CENT', 100, 200, 'underground', TRUE),
('egmore', 'chennai', 'che_blue', 'Egmore', 'EGMR', 180, 200, 'underground', TRUE);

-- Insert sample user (password is 'password123' hashed with bcrypt)
INSERT INTO users (username, email, password, full_name, phone_number, city) VALUES
('john_doe', 'john@example.com', '$2a$10$rQjKJtMqGqJtMqGqJtMqGu', 'John Doe', '9876543210', 'hyderabad');

-- Insert sample booking
INSERT INTO bookings (id, booking_reference, user_id, city_id, source_station_id, destination_station_id, 
    source_station_name, destination_station_name, fare, stops, travel_time, travel_minutes,
    route_path, interchanges, booking_date, travel_date, passenger_count, total_amount,
    payment_method, payment_status, booking_status, timestamp) VALUES
('BK001', 'HYDMP20231201120001', 1, 'hyderabad', 'mgbs', 'sr_nagar',
 'MGBS', 'SR Nagar', 20, 2, '4 min', 4,
 '["mgbs","ameerpet","sr_nagar"]', '[]',
 CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 1, 20,
 'card', 'completed', 'confirmed', UNIX_TIMESTAMP());

-- Create indexes for better query performance
CREATE INDEX idx_bookings_composite ON bookings(user_id, booking_status, travel_date);
CREATE INDEX idx_payments_composite ON payments(user_id, payment_status, payment_date);
CREATE INDEX idx_stations_search ON stations(city_id, line_id, is_active);
CREATE INDEX idx_users_search ON users(city, is_active, role);

-- Create a fulltext index for station name search
ALTER TABLE stations ADD FULLTEXT INDEX ft_station_name (name);
