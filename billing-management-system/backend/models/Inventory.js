import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema(
  {
    product: {
      type: String,
      enum: ['Poha', 'Murmura'],
      required: true
    },
    quantityKg: { type: Number, required: true, min: 0 },
    unitPrice: { type: Number, required: true, min: 0 },
    batchDate: { type: Date, default: Date.now },
    notes: { type: String, trim: true }
  },
  { timestamps: true }
);

export default mongoose.model('Inventory', inventorySchema);
