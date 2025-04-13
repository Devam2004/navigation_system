// routes/buildings.js
const express = require('express');
const router = express.Router();
const Building = require('../models/Buildings');

// GET /api/buildings/:name
router.get('/:name', async (req, res) => {
  try {
    const building = await Building.findOne({ name: req.params.name });
    if (!building) return res.status(404).json({ error: 'Building not found' });

    // Send only the structure you need
    res.json({
      name: building.name,
      floors: building.floors,
      departments: building.departments,
      facilities: building.facilities
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
