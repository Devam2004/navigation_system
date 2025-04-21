import express from 'express';
const router = express.Router();
import Issues from '../models/Issues.js'; 
// POST /api/issues
router.post('/', async (req, res) => {
  try {
    const { blockName, issueText } = req.body;

    if (!blockName || !issueText) {
      return res.status(400).json({ error: 'blockName and issueText are required' });
    }

    const issue = new Issue({ blockName, issueText });
    await issue.save();

    res.status(201).json({ message: 'Issue submitted successfully', issue });
  } catch (err) {
    console.error('Error saving issue:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
