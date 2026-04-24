const express = require('express');
const router = express.Router();
const Device = require('../models/Device');
const Image = require('../models/Image');
const Blockchain = require('../models/Blockchain');
const authMiddleware = require('../middleware/auth');

// Get dashboard statistics
router.get('/statistics', authMiddleware, async (req, res) => {
  try {
    const devices = await Device.getAllDevices();
    const images = await Image.getAllImages();
    const blocks = await Blockchain.getAllBlocks();

    const verifiedImages = images.filter(img => img.verified === 1).length;
    const tamperedImages = images.filter(img => img.verified === 0).length;

    res.json({
      success: true,
      statistics: {
        totalDevices: devices.length,
        activeDevices: devices.filter(d => d.status === 'active').length,
        totalEncryptedImages: images.length,
        verifiedImages,
        tamperedImages,
        blockchainBlocks: blocks.length,
        blockchainValid: blocks.length > 0
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard statistics:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Get device activity
router.get('/device-activity', authMiddleware, async (req, res) => {
  try {
    const images = await Image.getAllImages();
    
    // Group by device
    const activity = {};
    images.forEach(img => {
      if (!activity[img.device_id]) {
        activity[img.device_id] = 0;
      }
      activity[img.device_id]++;
    });

    res.json({
      success: true,
      activity
    });
  } catch (error) {
    console.error('Error fetching device activity:', error);
    res.status(500).json({ error: 'Failed to fetch device activity' });
  }
});

module.exports = router;
