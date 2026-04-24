#!/bin/bash

# Setup script for Blockchain Secure Surveillance System

echo "🔐 Blockchain-Integrated Secure Surveillance Setup"
echo "=================================================="
echo ""

# Check if Node.js is installed
echo "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ from https://nodejs.org/"
    exit 1
fi
echo "✓ Node.js $(node -v) found"

# Check if Python is installed
echo "Checking Python installation..."
if ! command -v python &> /dev/null; then
    echo "❌ Python is not installed. Please install Python 3.8+ from https://www.python.org/"
    exit 1
fi
echo "✓ Python $(python --version) found"

# Check if MySQL is installed
echo "Checking MySQL installation..."
if ! command -v mysql &> /dev/null; then
    echo "⚠️  MySQL is not in PATH. Make sure MySQL server is running."
fi

echo ""
echo "📦 Installing dependencies..."

# Install backend dependencies
echo "Installing Node.js dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install Node.js dependencies"
    exit 1
fi
echo "✓ Node.js dependencies installed"

# Copy .env if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✓ Created .env file from .env.example - Please update database credentials"
fi

cd ..

# Install Python dependencies
echo "Installing Python dependencies..."
cd python-encryption
pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "❌ Failed to install Python dependencies"
    exit 1
fi
echo "✓ Python dependencies installed"

cd ..

echo ""
echo "✓ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update backend/.env with your MySQL credentials"
echo "2. Create database: mysql -u root -p < database/schema.sql"
echo "3. Start backend: cd backend && npm start"
echo "4. Start Python service: cd python-encryption && python app.py"
echo "5. Open frontend: cd frontend && serve or open index.html in browser"
echo ""
echo "Default demo credentials:"
echo "Email: admin@example.com"
echo "Password: password123"
