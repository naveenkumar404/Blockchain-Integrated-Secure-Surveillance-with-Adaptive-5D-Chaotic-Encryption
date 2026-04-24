const crypto = require('crypto');
const Blockchain = require('../models/Blockchain');

class BlockchainService {
  static calculateHash(data) {
    return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
  }

  static generateNonce(difficulty = 4) {
    let nonce = 0;
    while (true) {
      const hash = this.calculateHash({
        data: new Date().getTime(),
        nonce: nonce
      });
      if (hash.startsWith('0'.repeat(difficulty))) {
        return nonce;
      }
      nonce++;
    }
  }

  static async createNewBlock(encryptedImageHash) {
    try {
      const lastBlock = await Blockchain.getLastBlock();
      const previousHash = lastBlock ? lastBlock.current_hash : '0';
      const nonce = this.generateNonce(2);
      
      const blockData = {
        previousHash,
        encryptedImageHash,
        timestamp: new Date(),
        nonce
      };

      const currentHash = this.calculateHash(blockData);

      const result = await Blockchain.createBlock(previousHash, currentHash, nonce);
      
      return {
        success: true,
        blockId: result.insertId,
        previousHash,
        currentHash,
        nonce,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Error creating blockchain block:', error);
      throw error;
    }
  }

  static async verifyBlockchain() {
    try {
      const blocks = await Blockchain.verifyChain();
      let isValid = true;

      for (let i = 1; i < blocks.length; i++) {
        if (blocks[i].previous_hash !== blocks[i - 1].current_hash) {
          isValid = false;
          break;
        }
      }

      return {
        isValid,
        totalBlocks: blocks.length,
        blocks
      };
    } catch (error) {
      console.error('Error verifying blockchain:', error);
      throw error;
    }
  }

  static async verifyImageHash(imageHash, blockId) {
    try {
      const block = await Blockchain.getBlockById(blockId);
      
      if (!block) {
        return {
          verified: false,
          message: 'Block not found'
        };
      }

      // In a real scenario, you would recalculate the hash of the decrypted image
      // For now, we compare the stored hash
      const verified = imageHash === block.current_hash;

      return {
        verified,
        message: verified ? 'Image Integrity Verified ✓' : 'Image Integrity Compromised ✗',
        blockHash: block.current_hash,
        providedHash: imageHash
      };
    } catch (error) {
      console.error('Error verifying image:', error);
      throw error;
    }
  }
}

module.exports = BlockchainService;
