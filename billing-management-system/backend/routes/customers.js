import express from 'express';
import Customer from '../models/Customer.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  const customers = await Customer.find().sort({ createdAt: -1 });
  res.json(customers);
});

router.post('/', async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
