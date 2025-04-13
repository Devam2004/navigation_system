import express from 'express';
import Location from '../models/Location.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
