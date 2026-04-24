const express = require('express');
const router = express.Router();
const BlockchainService = require('../utils/blockchainService');
const Blockchain = require('../models/Blockchain');
const authMiddleware = require('../middleware/auth');

// Verify image integrity
router.post('/verify', authMiddleware, async (req, res) => {
  try {
    const { imageHash, blockId } = req.body;

    if (!imageHash || !blockId) {
      return res.status(400).json({ error: 'Image hash and block ID required' });
    }

    const result = await BlockchainService.verifyImageHash(imageHash, blockId);

    res.json({
      success: true,
      verified: result.verified,
      message: result.message,
      details: {
        storedHash: result.blockHash,
        providedHash: result.providedHash
      }
    });
  } catch (error) {
    console.error('Error verifying image:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

// Get all blocks
router.get('/blocks', authMiddleware, async (req, res) => {
  try {
    const blocks = await Blockchain.getAllBlocks();
    res.json({
      success: true,
      blocks,
      totalBlocks: blocks.length
    });
  } catch (error) {
    console.error('Error fetching blocks:', error);
    res.status(500).json({ error: 'Failed to fetch blocks' });
  }
});

// Verify blockchain integrity
router.get('/verify-chain', authMiddleware, async (req, res) => {
  try {
    const result = await BlockchainService.verifyBlockchain();

    res.json({
      success: true,
      blockchainValid: result.isValid,
      totalBlocks: result.totalBlocks,
      message: result.isValid ? 'Blockchain is valid' : 'Blockchain has been tampered with',
      blocks: result.blocks
    });
  } catch (error) {
    console.error('Error verifying blockchain:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

module.exports = router;
