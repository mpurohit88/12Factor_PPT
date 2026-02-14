import { useEffect, useState } from 'react';
import api from '../services/api';

const initialForm = {
  product: 'Poha',
  quantityKg: '',
  unitPrice: '',
  notes: ''
};

export default function InventoryPage() {
  const [form, setForm] = useState(initialForm);
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    const { data } = await api.get('/inventory');
    setItems(data);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    await api.post('/inventory', {
      ...form,
      quantityKg: Number(form.quantityKg),
      unitPrice: Number(form.unitPrice)
    });
    setForm(initialForm);
    loadItems();
  };

  return (
    <section>
      <h2>Inventory (Poha & Murmura)</h2>
      <form onSubmit={submit} className="card form-grid">
        <label>
          Product
          <select
            value={form.product}
            onChange={(e) => setForm({ ...form, product: e.target.value })}
          >
            <option>Poha</option>
            <option>Murmura</option>
          </select>
        </label>
        <label>
          Quantity (kg)
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.quantityKg}
            onChange={(e) => setForm({ ...form, quantityKg: e.target.value })}
            required
          />
        </label>
        <label>
          Unit Price
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.unitPrice}
            onChange={(e) => setForm({ ...form, unitPrice: e.target.value })}
            required
          />
        </label>
        <label>
          Notes
          <input
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </label>
        <button type="submit">Save Stock</button>
      </form>

      <div className="card">
        <h3>Current Entries</h3>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty (kg)</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.product}</td>
                <td>{item.quantityKg}</td>
                <td>{item.unitPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
