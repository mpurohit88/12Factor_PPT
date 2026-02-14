import express from 'express';
import Inventory from '../models/Inventory.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  const stock = await Inventory.find().sort({ createdAt: -1 });
  res.json(stock);
});

router.post('/', async (req, res) => {
  try {
    const item = await Inventory.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
