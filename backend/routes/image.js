const express = require('express');
const router = express.Router();
const Image = require('../models/Image');
const EncryptionService = require('../utils/encryptionService');
const BlockchainService = require('../utils/blockchainService');
const SecurityMetrics = require('../utils/securityMetrics');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

// Upload and encrypt image
router.post('/upload', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { deviceId } = req.body;
    
    if (!deviceId || !req.file) {
      return res.status(400).json({ error: 'Device ID and image file required' });
    }

    // Encrypt image using Python service
    const encryptedResult = await EncryptionService.callPythonEncryptionService(req.file.buffer);

    // Calculate hash
    const imageHash = EncryptionService.calculateHash(Buffer.from(encryptedResult.encrypted_data, 'base64'));

    // Create blockchain block
    const blockchainResult = await BlockchainService.createNewBlock(imageHash);

    // Store in database
    const dbResult = await Image.createImage(
      deviceId,
      encryptedResult.path || `/encrypted/${Date.now()}.bin`,
      imageHash,
      encryptedResult.entropy,
      blockchainResult.nonce
    );

    res.status(201).json({
      success: true,
      imageId: dbResult.insertId,
      blockHash: blockchainResult.currentHash,
      entropy: encryptedResult.entropy,
      nonce: blockchainResult.nonce,
      message: 'Image encrypted, hashed, and stored on blockchain'
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Get images by device
router.get('/device/:deviceId', authMiddleware, async (req, res) => {
  try {
    const { deviceId } = req.params;
    const images = await Image.getImagesByDeviceId(deviceId);

    res.json({
      success: true,
      images
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// Get all images
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const images = await Image.getAllImages();
    res.json({
      success: true,
      images
    });
  } catch (error) {
    console.error('Error fetching all images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

module.exports = router;
