import express from 'express';
import Invoice from '../models/Invoice.js';

const router = express.Router();

router.get('/invoices', async (_req, res) => {
  const invoices = await Invoice.find().populate('customerId', 'name location').sort({ createdAt: -1 });
  res.json(invoices);
});

router.post('/invoices', async (req, res) => {
  try {
    const totalAmount = req.body.lines.reduce(
      (sum, line) => sum + Number(line.quantityKg) * Number(line.unitPrice),
      0
    );

    const invoice = await Invoice.create({
      ...req.body,
      totalAmount
    });

    res.status(201).json(invoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
