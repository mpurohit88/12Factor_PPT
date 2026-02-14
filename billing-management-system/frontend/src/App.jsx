import { Link, Route, Routes } from 'react-router-dom';
import InventoryPage from './pages/InventoryPage';
import CustomersPage from './pages/CustomersPage';
import BillingPage from './pages/BillingPage';

export default function App() {
  return (
    <div className="app-shell">
      <header>
        <h1>Billing & Accounts</h1>
        <nav>
          <Link to="/">Inventory</Link>
          <Link to="/customers">Customers</Link>
          <Link to="/billing">Billing</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<InventoryPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/billing" element={<BillingPage />} />
        </Routes>
      </main>
    </div>
  );
}
