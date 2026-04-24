const express = require('express');
const router = express.Router();
const SecurityMetrics = require('../utils/securityMetrics');
const authMiddleware = require('../middleware/auth');

// Calculate metrics for image
router.post('/metrics', authMiddleware, async (req, res) => {
  try {
    const { originalPixels, encryptedPixels } = req.body;

    if (!originalPixels || !encryptedPixels) {
      return res.status(400).json({ error: 'Original and encrypted pixel data required' });
    }

    const metrics = SecurityMetrics.getAllMetrics(originalPixels, encryptedPixels);

    if (!metrics) {
      return res.status(500).json({ error: 'Failed to calculate metrics' });
    }

    res.json({
      success: true,
      metrics: {
        entropy: parseFloat(metrics.entropy),
        npcr: parseFloat(metrics.npcr),
        uaci: parseFloat(metrics.uaci),
        correlation: parseFloat(metrics.correlation),
        psnr: parseFloat(metrics.psnr),
        recommendations: {
          entropy: parseFloat(metrics.entropy) > 7.9 ? 'Good entropy' : 'Low entropy - regenerate parameters',
          npcr: parseFloat(metrics.npcr) > 99.5 ? 'Excellent diffusion' : 'Needs improvement',
          uaci: parseFloat(metrics.uaci) > 33 ? 'Good diffusion' : 'Needs improvement'
        }
      }
    });
  } catch (error) {
    console.error('Error calculating metrics:', error);
    res.status(500).json({ error: 'Failed to calculate metrics' });
  }
});

// Get entropy trend
router.get('/entropy-trend', authMiddleware, async (req, res) => {
  try {
    // Mock data - in real implementation, fetch from database
    const trendData = [
      { time: '2026-02-18 10:00', entropy: 7.85 },
      { time: '2026-02-18 11:00', entropy: 7.89 },
      { time: '2026-02-18 12:00', entropy: 7.92 },
      { time: '2026-02-18 13:00', entropy: 7.88 },
      { time: '2026-02-18 14:00', entropy: 7.95 },
      { time: '2026-02-18 15:00', entropy: 7.91 }
    ];

    res.json({
      success: true,
      trendData
    });
  } catch (error) {
    console.error('Error fetching entropy trend:', error);
    res.status(500).json({ error: 'Failed to fetch entropy trend' });
  }
});

// Get encryption speed analytics
router.get('/encryption-speed', authMiddleware, async (req, res) => {
  try {
    // Mock data - in real implementation, measure actual encryption times
    const speedData = [
      { resolution: '480p', time: 45 },
      { resolution: '720p', time: 85 },
      { resolution: '1080p', time: 180 },
      { resolution: '4K', time: 350 }
    ];

    res.json({
      success: true,
      speedData
    });
  } catch (error) {
    console.error('Error fetching encryption speed:', error);
    res.status(500).json({ error: 'Failed to fetch encryption speed' });
  }
});

module.exports = router;
