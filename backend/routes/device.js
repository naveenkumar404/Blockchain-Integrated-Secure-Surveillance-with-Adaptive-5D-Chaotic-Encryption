const express = require('express');
const router = express.Router();
const Device = require('../models/Device');
const authMiddleware = require('../middleware/auth');

// Create device
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { deviceName, location } = req.body;
    const userId = req.user.id;

    if (!deviceName || !location) {
      return res.status(400).json({ error: 'Device name and location required' });
    }

    const result = await Device.createDevice(deviceName, location, userId);

    res.status(201).json({
      success: true,
      deviceId: result.insertId,
      deviceName,
      location,
      status: 'active'
    });
  } catch (error) {
    console.error('Error creating device:', error);
    res.status(500).json({ error: 'Failed to create device' });
  }
});

// Get user's devices
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const devices = await Device.getDevicesByUserId(userId);

    res.json({
      success: true,
      devices
    });
  } catch (error) {
    console.error('Error fetching devices:', error);
    res.status(500).json({ error: 'Failed to fetch devices' });
  }
});

// Get all devices (admin)
router.get('/all', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const devices = await Device.getAllDevices();
    res.json({
      success: true,
      devices
    });
  } catch (error) {
    console.error('Error fetching all devices:', error);
    res.status(500).json({ error: 'Failed to fetch devices' });
  }
});

// Update device status
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status required' });
    }

    const result = await Device.updateDeviceStatus(id, status);

    res.json({
      success: true,
      message: 'Device status updated'
    });
  } catch (error) {
    console.error('Error updating device status:', error);
    res.status(500).json({ error: 'Failed to update device status' });
  }
});

module.exports = router;
