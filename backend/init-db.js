const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function initializeDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true
  });

  try {
    console.log('📊 Starting database initialization...\n');

    // Read and execute schema
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const sampleDataPath = path.join(__dirname, '../database/sample-data.sql');

    const schema = fs.readFileSync(schemaPath, 'utf8');
    const sampleData = fs.readFileSync(sampleDataPath, 'utf8');

    console.log('🔨 Creating database schema...');
    await connection.query(schema);
    console.log('✅ Database schema created successfully\n');

    console.log('📝 Inserting sample data...');
    await connection.query(sampleData);
    console.log('✅ Sample data inserted successfully\n');

    console.log('📋 Database Initialization Summary:');
    console.log('   ✓ Database: surveillance_db');
    console.log('   ✓ Tables: users, devices, images, blockchain, encryption_logs, audit_logs');
    console.log('   ✓ Sample Users: 3 (1 admin, 2 regular users)');
    console.log('   ✓ Sample Devices: 7 active/inactive cameras');
    console.log('   ✓ Sample Images: 7 encrypted records');
    console.log('   ✓ Sample Blockchain: 5 chain blocks');
    console.log('   ✓ Sample Encryption Logs: 7 entries with metrics\n');

    console.log('👤 Demo Credentials:');
    console.log('   admin@example.com / password123 (Admin)');
    console.log('   john@example.com / password123 (User)');
    console.log('   sarah@example.com / password123 (User)\n');

    console.log('✨ Database initialization complete!\n');

    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    await connection.end();
    process.exit(1);
  }
}

initializeDatabase();
