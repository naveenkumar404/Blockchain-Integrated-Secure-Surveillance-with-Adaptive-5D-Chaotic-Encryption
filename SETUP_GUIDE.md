# SETUP GUIDE

## System Requirements

- **Node.js** 16.0 or higher
- **Python** 3.8 or higher
- **MySQL** 8.0 or higher
- **npm** 8.0 or higher
- **pip** 21.0 or higher

## Installation Steps

### Windows

1. **Run Setup Script**
   ```cmd
   setup.bat
   ```

2. **Update Database Configuration**
   - Edit `backend/.env`
   - Update `DB_USER`, `DB_PASSWORD`, etc.

3. **Create Database**
   ```cmd
   mysql -u root -p < database/schema.sql
   ```

4. **Start Backend Server**
   ```cmd
   cd backend
   npm start
   ```
   Server will run on http://localhost:5000

5. **Start Python Encryption Service** (in new terminal)
   ```cmd
   cd python-encryption
   python app.py
   ```
   Service will run on http://localhost:5001

6. **Access Frontend**
   - Right-click `frontend/index.html` and open with browser
   - Or serve with Python: `cd frontend && python -m http.server 8000`
   - Access at http://localhost:8000

### macOS/Linux

1. **Run Setup Script**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

2. **Update Database Configuration**
   ```bash
   nano backend/.env
   ```
   Update `DB_USER`, `DB_PASSWORD`, etc.

3. **Create Database**
   ```bash
   mysql -u root -p < database/schema.sql
   ```

4. **Start Backend Server**
   ```bash
   cd backend
   npm start
   ```

5. **Start Python Encryption Service** (in new terminal)
   ```bash
   cd python-encryption
   python app.py
   ```

6. **Access Frontend**
   ```bash
   cd frontend
   python -m http.server 8000
   ```

## Configuration

### Backend Environment Variables

Edit `backend/.env`:

```env
PORT=5000                           # Express server port
DB_HOST=localhost                   # MySQL host
DB_USER=root                        # MySQL user
DB_PASSWORD=your_password           # MySQL password
DB_NAME=surveillance_db             # Database name
JWT_SECRET=your_secret_key          # JWT signing key
NODE_ENV=development                # Environment
PYTHON_SERVICE_URL=http://localhost:5001  # Python service URL
ENCRYPTION_SERVICE_PORT=5001        # Python service port
```

### Database Setup

The `database/schema.sql` file creates:
- `users` - User accounts
- `devices` - IoT camera devices
- `images` - Encrypted surveillance frames
- `blockchain` - Blockchain blocks
- `encryption_logs` - Encryption metrics
- `audit_logs` - System audit trail

Default admin user:
- **Email:** admin@example.com
- **Password:** password123

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :5000   # Windows
```

### MySQL Connection Error

```bash
# Check MySQL is running
mysql -u root -p
# If not installed, install MySQL server

# Verify connection string in .env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
```

### Python Dependencies Fail

```bash
# Update pip
python -m pip install --upgrade pip

# Retry installation
pip install -r python-encryption/requirements.txt
```

### CORS Issues

- Ensure all services are running on correct ports
- Check API_BASE URL in frontend JS files
- Python service must be accessible at http://localhost:5001

## API Testing

### Using cURL

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'

# Get devices
curl -X GET http://localhost:5000/api/devices \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Performance Tuning

### Database Optimization

```sql
-- Add indexing for faster queries
ALTER TABLE images ADD INDEX idx_device (device_id);
ALTER TABLE images ADD INDEX idx_hash (hash);
ALTER TABLE blockchain ADD INDEX idx_prev_hash (previous_hash);
```

### Python Service Optimization

- Use `gunicorn` for production:
  ```bash
  pip install gunicorn
  gunicorn -w 4 -b 0.0.0.0:5001 app:app
  ```

### Node.js Optimization

- Use `pm2` for process management:
  ```bash
  npm install -g pm2
  pm2 start backend/server.js
  ```

## Production Deployment

### Environment Setup

1. **Change NODE_ENV to production**
2. **Use strong JWT_SECRET**
3. **Enable HTTPS**
4. **Configure CORS properly**
5. **Set up SSL certificates**

### Database Backup

```bash
mysqldump -u root -p surveillance_db > backup.sql
```

### Monitoring

- Monitor server logs
- Track encryption metrics
- Monitor blockchain status
- Setup email alerts for tampering

## Support & Documentation

- See `README.md` for full documentation
- API endpoints documented in README
- Security features explained in README
- Check logs for debugging

---

**Version:** 1.0.0
**Last Updated:** February 2026
