import express from 'express';
const router = express.Router();
import Location from '../models/Location.js'; // 🔴 Make sure this import exists and is correct

// GET all locations
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).send('Error fetching locations');
  }
});

// ✅ GET a location by name
router.get('/:name', async (req, res) => {
  try {
    const location = await Location.findOne({ name: req.params.name });
    if (!location) return res.status(404).json({ error: 'Location not found' });
    res.json(location);
  } catch (err) {
    res.status(500).send('Error fetching location by name');
  }
});

export default router;
