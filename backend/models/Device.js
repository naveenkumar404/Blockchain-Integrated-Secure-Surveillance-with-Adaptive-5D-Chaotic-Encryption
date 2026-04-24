const pool = require('../config/database');

class Device {
  static async createDevice(deviceName, location, userId) {
    const query = 'INSERT INTO devices (device_name, location, user_id, status) VALUES (?, ?, ?, ?)';
    const [result] = await pool.execute(query, [deviceName, location, userId, 'active']);
    return result;
  }

  static async getDevicesByUserId(userId) {
    const query = 'SELECT * FROM devices WHERE user_id = ?';
    const [rows] = await pool.execute(query, [userId]);
    return rows;
  }

  static async getDeviceById(id) {
    const query = 'SELECT * FROM devices WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
  }

  static async getAllDevices() {
    const query = 'SELECT * FROM devices';
    const [rows] = await pool.execute(query);
    return rows;
  }

  static async updateDeviceStatus(id, status) {
    const query = 'UPDATE devices SET status = ? WHERE id = ?';
    const [result] = await pool.execute(query, [status, id]);
    return result;
  }
}

module.exports = Device;
