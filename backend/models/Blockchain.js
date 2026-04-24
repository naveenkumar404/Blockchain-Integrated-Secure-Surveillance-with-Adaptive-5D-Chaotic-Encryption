const pool = require('../config/database');

class Blockchain {
  static async createBlock(previousHash, currentHash, nonce) {
    const query = 'INSERT INTO blockchain (previous_hash, current_hash, nonce, timestamp) VALUES (?, ?, ?, NOW())';
    const [result] = await pool.execute(query, [previousHash, currentHash, nonce]);
    return result;
  }

  static async getBlockById(id) {
    const query = 'SELECT * FROM blockchain WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
  }

  static async getAllBlocks() {
    const query = 'SELECT * FROM blockchain ORDER BY id DESC';
    const [rows] = await pool.execute(query);
    return rows;
  }

  static async getLastBlock() {
    const query = 'SELECT * FROM blockchain ORDER BY id DESC LIMIT 1';
    const [rows] = await pool.execute(query);
    return rows[0];
  }

  static async verifyChain() {
    const query = 'SELECT * FROM blockchain ORDER BY id ASC';
    const [blocks] = await pool.execute(query);
    return blocks;
  }
}

module.exports = Blockchain;
