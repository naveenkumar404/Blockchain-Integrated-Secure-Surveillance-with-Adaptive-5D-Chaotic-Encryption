const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async createUser(name, email, password, role = 'user') {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    const [result] = await pool.execute(query, [name, email, hashedPassword, role]);
    return result;
  }

  static async getUserByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await pool.execute(query, [email]);
    return rows[0];
  }

  static async getUserById(id) {
    const query = 'SELECT id, name, email, role FROM users WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
  }

  static async getAllUsers() {
    const query = 'SELECT id, name, email, role FROM users';
    const [rows] = await pool.execute(query);
    return rows;
  }

  static async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

module.exports = User;
