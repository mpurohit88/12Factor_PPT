import mongoose from 'mongoose';

const invoiceLineSchema = new mongoose.Schema(
  {
    product: { type: String, enum: ['Poha', 'Murmura'], required: true },
    quantityKg: { type: Number, required: true, min: 0 },
    unitPrice: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const invoiceSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    },
    invoiceDate: { type: Date, default: Date.now },
    lines: { type: [invoiceLineSchema], required: true },
    totalAmount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' }
  },
  { timestamps: true }
);

export default mongoose.model('Invoice', invoiceSchema);
