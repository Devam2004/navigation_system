// routes/buildings.js
const express = require('express');
const router = express.Router();
const Building = require('../models/Buildings');  // Make sure your model points to 'locations'

// GET /api/buildings/:name
router.get('/:name', async (req, res) => {
  try {
    console.log("Looking for building:", req.params.name); // Log the requested building name

    // Decode the name to avoid issues with encoding (e.g., "E Block" -> "E%20Block")
    const buildingName = decodeURIComponent(req.params.name);

    // Find the building in the 'locations' collection by its name
    const building = await Building.findOne({ name: buildingName });

    if (!building) {
      return res.status(404).json({ error: 'Building not found' });
    }

    // Send the building details as JSON
    res.json({
      name: building.name,
      type: building.type,
      description: building.description,
      coords: building.coords,
      features: building.features,
      floors: building.floors,
      capacity: building.capacity,
      hasAC: building.hasAC,
      accessible: building.accessible,
      openingHours: building.openingHours
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
