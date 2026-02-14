import { useEffect, useState } from 'react';
import api from '../services/api';

const initialForm = {
  name: '',
  phone: '',
  email: '',
  location: '',
  address: '',
  gstNumber: '',
  notes: ''
};

export default function CustomersPage() {
  const [form, setForm] = useState(initialForm);
  const [customers, setCustomers] = useState([]);

  const loadCustomers = async () => {
    const { data } = await api.get('/customers');
    setCustomers(data);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    await api.post('/customers', form);
    setForm(initialForm);
    loadCustomers();
  };

  return (
    <section>
      <h2>Customers</h2>
      <form onSubmit={submit} className="card form-grid">
        <label>
          Customer Name
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </label>
        <label>
          Phone
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>
        <label>
          Location
          <input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />
        </label>
        <label>
          Address
          <input
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </label>
        <label>
          GST Number
          <input
            value={form.gstNumber}
            onChange={(e) => setForm({ ...form, gstNumber: e.target.value })}
          />
        </label>
        <label>
          Notes
          <input
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </label>
        <button type="submit">Save Customer</button>
      </form>

      <div className="card">
        <h3>Customer List</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td>{customer.name}</td>
                <td>{customer.location}</td>
                <td>{customer.phone}</td>
                <td>{customer.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
