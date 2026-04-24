# Windows Setup Script for Blockchain Secure Surveillance System

@echo off
echo.
echo 🔐 Blockchain-Integrated Secure Surveillance Setup (Windows)
echo =========================================================
echo.

REM Check if Node.js is installed
echo Checking Node.js installation...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ from https://nodejs.org/
    exit /b 1
)
for /f "tokens=*" %%i in ('node -v') do echo ✓ Node.js %%i found

REM Check if Python is installed
echo Checking Python installation...
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Python is not installed. Please install Python 3.8+ from https://www.python.org/
    exit /b 1
)
for /f "tokens=*" %%i in ('python --version') do echo ✓ Python %%i found

echo.
echo 📦 Installing dependencies...

REM Install backend dependencies
echo Installing Node.js dependencies...
cd backend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install Node.js dependencies
    exit /b 1
)
echo ✓ Node.js dependencies installed

REM Copy .env if it doesn't exist
if not exist .env (
    copy .env.example .env
    echo ✓ Created .env file from .env.example - Please update database credentials
)

cd ..

REM Install Python dependencies
echo Installing Python dependencies...
cd python-encryption
pip install -r requirements.txt
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install Python dependencies
    exit /b 1
)
echo ✓ Python dependencies installed

cd ..

echo.
echo ✓ Setup complete!
echo.
echo 📝 Next steps:
echo 1. Update backend\.env with your MySQL credentials
echo 2. Create database: mysql -u root -p less database/schema.sql
echo 3. Start backend: cd backend ^&^& npm start
echo 4. Start Python service: cd python-encryption ^&^& python app.py
echo 5. Open frontend: Open frontend/index.html in browser
echo.
echo Default demo credentials:
echo Email: admin@example.com
echo Password: password123
echo.
pause
