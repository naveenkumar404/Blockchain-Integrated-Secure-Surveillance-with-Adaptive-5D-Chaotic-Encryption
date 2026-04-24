const pool = require('../config/database');

class Image {
  static async createImage(deviceId, encryptedPath, imageHash, entropy, nonce) {
    const query = 'INSERT INTO images (device_id, encrypted_path, hash, entropy, nonce, timestamp) VALUES (?, ?, ?, ?, ?, NOW())';
    const [result] = await pool.execute(query, [deviceId, encryptedPath, imageHash, entropy, nonce]);
    return result;
  }

  static async getImagesByDeviceId(deviceId) {
    const query = 'SELECT * FROM images WHERE device_id = ? ORDER BY timestamp DESC';
    const [rows] = await pool.execute(query, [deviceId]);
    return rows;
  }

  static async getImageById(id) {
    const query = 'SELECT * FROM images WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
  }

  static async getAllImages() {
    const query = 'SELECT * FROM images ORDER BY timestamp DESC';
    const [rows] = await pool.execute(query);
    return rows;
  }

  static async updateImageVerified(id, verified) {
    const query = 'UPDATE images SET verified = ? WHERE id = ?';
    const [result] = await pool.execute(query, [verified, id]);
    return result;
  }
}

module.exports = Image;
