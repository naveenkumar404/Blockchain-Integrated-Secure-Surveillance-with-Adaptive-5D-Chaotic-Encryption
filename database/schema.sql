-- Create database
CREATE DATABASE IF NOT EXISTS surveillance_db;
USE surveillance_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Devices Table
CREATE TABLE IF NOT EXISTS devices (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    device_name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    status ENUM('active', 'inactive', 'maintenance') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Images Table
CREATE TABLE IF NOT EXISTS images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    device_id INT NOT NULL,
    encrypted_path VARCHAR(500),
    hash VARCHAR(64) NOT NULL,
    entropy FLOAT,
    nonce INT,
    verified TINYINT DEFAULT 0,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE,
    INDEX(device_id),
    INDEX(hash)
);

-- Blockchain Table
CREATE TABLE IF NOT EXISTS blockchain (
    id INT PRIMARY KEY AUTO_INCREMENT,
    previous_hash VARCHAR(64),
    current_hash VARCHAR(64) NOT NULL UNIQUE,
    nonce INT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX(previous_hash),
    INDEX(current_hash)
);

-- Encrypted Files Log Table
CREATE TABLE IF NOT EXISTS encryption_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    image_id INT NOT NULL,
    device_id INT NOT NULL,
    entropy FLOAT,
    npcr FLOAT,
    uaci FLOAT,
    correlation FLOAT,
    encryption_time INT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (image_id) REFERENCES images(id),
    FOREIGN KEY (device_id) REFERENCES devices(id)
);

-- Audit Log Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(255),
    details TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create default admin user
INSERT INTO users (name, email, password, role) VALUES
('Admin', 'admin@example.com', '$2a$10$YOvVV8kWi4rMW.FjEi0gd.GW5nW5Q5Q5Q5Q5Q5Q5Q5', 'admin')
ON DUPLICATE KEY UPDATE id=id;
