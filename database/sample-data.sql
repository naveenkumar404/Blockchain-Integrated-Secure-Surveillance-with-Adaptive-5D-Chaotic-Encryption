
-- Sample Data for Surveillance System
USE surveillance_db;

-- Sample Users
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@example.com', '$2a$10$YOvVV8kWi4rMW.FjEi0gd.GW5nW5Q5Q5Q5Q5Q5Q5Q5', 'admin'),
('John Security', 'john@example.com', '$2a$10$YOvVV8kWi4rMW.FjEi0gd.GW5nW5Q5Q5Q5Q5Q5Q5Q5', 'user'),
('Sarah Monitor', 'sarah@example.com', '$2a$10$YOvVV8kWi4rMW.FjEi0gd.GW5nW5Q5Q5Q5Q5Q5Q5Q5', 'user')
ON DUPLICATE KEY UPDATE id=id;

-- Sample Devices for Admin
INSERT INTO devices (user_id, device_name, location, status) VALUES
(1, 'Main Entrance Camera', 'Building A - Front Door', 'active'),
(1, 'Parking Lot Camera 1', 'Ground Floor - Lot A', 'active'),
(1, 'Server Room Camera', 'Basement - Level 3', 'active'),
(1, 'Conference Room Camera', 'Floor 5 - Room 501', 'active'),
(1, 'Backup Camera', 'Basement - Level 1', 'inactive')
ON DUPLICATE KEY UPDATE id=id;

-- Sample Devices for John
INSERT INTO devices (user_id, device_name, location, status) VALUES
(2, 'Office Area Camera', 'Floor 2 - Open Area', 'active'),
(2, 'Hallway Monitor', 'Floor 2 - Hallway', 'active')
ON DUPLICATE KEY UPDATE id=id;

-- Sample Images with encryption data
INSERT INTO images (device_id, encrypted_path, hash, entropy, nonce, verified, timestamp) VALUES
(1, '/uploads/encrypted_img_001.bin', 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0', 7.85, 12345, 1, NOW() - INTERVAL 2 HOUR),
(1, '/uploads/encrypted_img_002.bin', 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f', 7.92, 12346, 1, NOW() - INTERVAL 1 HOUR),
(2, '/uploads/encrypted_img_003.bin', 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g', 7.78, 12347, 1, NOW() - INTERVAL 45 MINUTE),
(3, '/uploads/encrypted_img_004.bin', 'd4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h', 7.88, 12348, 1, NOW() - INTERVAL 30 MINUTE),
(4, '/uploads/encrypted_img_005.bin', 'e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i', 7.81, 12349, 1, NOW() - INTERVAL 15 MINUTE),
(6, '/uploads/encrypted_img_006.bin', 'f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j', 7.95, 12350, 1, NOW() - INTERVAL 10 MINUTE),
(7, '/uploads/encrypted_img_007.bin', 'g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k', 7.83, 12351, 1, NOW() - INTERVAL 5 MINUTE)
ON DUPLICATE KEY UPDATE id=id;

-- Sample Blockchain Records
INSERT INTO blockchain (previous_hash, current_hash, nonce, timestamp) VALUES
(NULL, '0000a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b', 1000, NOW() - INTERVAL 2 HOUR),
('0000a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b', '0001b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c', 1001, NOW() - INTERVAL 1 HOUR),
('0001b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c', '0002c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d', 1002, NOW() - INTERVAL 45 MINUTE),
('0002c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d', '0003d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e', 1003, NOW() - INTERVAL 30 MINUTE),
('0003d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e', '0004e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f', 1004, NOW() - INTERVAL 15 MINUTE)
ON DUPLICATE KEY UPDATE id=id;

-- Sample Encryption Logs
INSERT INTO encryption_logs (image_id, device_id, entropy, npcr, uaci, correlation, encryption_time, timestamp) VALUES
(1, 1, 7.85, 0.9965, 33.45, 0.0012, 245, NOW() - INTERVAL 2 HOUR),
(2, 1, 7.92, 0.9971, 33.52, 0.0008, 252, NOW() - INTERVAL 1 HOUR),
(3, 2, 7.78, 0.9958, 33.38, 0.0015, 238, NOW() - INTERVAL 45 MINUTE),
(4, 3, 7.88, 0.9968, 33.48, 0.0010, 248, NOW() - INTERVAL 30 MINUTE),
(5, 4, 7.81, 0.9962, 33.42, 0.0013, 242, NOW() - INTERVAL 15 MINUTE),
(6, 6, 7.95, 0.9974, 33.55, 0.0006, 256, NOW() - INTERVAL 10 MINUTE),
(7, 7, 7.83, 0.9960, 33.40, 0.0014, 240, NOW() - INTERVAL 5 MINUTE)
ON DUPLICATE KEY UPDATE id=id;

-- Sample Audit Logs
INSERT INTO audit_logs (user_id, action, details, timestamp) VALUES
(1, 'Login', 'Admin logged in successfully', NOW() - INTERVAL 2 HOUR),
(1, 'Upload', 'Image uploaded and encrypted from device 1', NOW() - INTERVAL 1 HOUR),
(2, 'Login', 'User john@example.com logged in', NOW() - INTERVAL 45 MINUTE),
(2, 'Upload', 'Image uploaded from device 6', NOW() - INTERVAL 30 MINUTE),
(1, 'Verification', 'Hash verified successfully for image 1', NOW() - INTERVAL 15 MINUTE),
(3, 'Login', 'User sarah@example.com logged in', NOW() - INTERVAL 10 MINUTE),
(1, 'System Check', 'Daily system integrity check passed', NOW() - INTERVAL 5 MINUTE)
ON DUPLICATE KEY UPDATE id=id;
