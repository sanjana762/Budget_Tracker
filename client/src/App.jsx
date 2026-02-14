import { useEffect, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import api from './api';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import SavingsPage from './pages/SavingsPage';

const initialData = {
  transactions: [],
  projection: { projectedIncome: 0, projectedOutcome: 0 },
  savings: { total: 0, history: [] },
};

export default function App() {
  const [data, setData] = useState(initialData);

  const fetchData = async () => {
    const response = await api.get('/budget');
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totals = useMemo(() => {
    const income = data.transactions.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
    const expense = data.transactions.filter((t) => t.amount < 0).reduce((s, t) => s + t.amount, 0);
    return { income, expense, balance: income + expense };
  }, [data.transactions]);

  const expensesByCategory = useMemo(() => {
    return data.transactions
      .filter((t) => t.amount < 0)
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
        return acc;
      }, {});
  }, [data.transactions]);

  const onAddTransaction = async (payload) => {
    await api.post('/transactions', payload);
    fetchData();
  };

  const onSaveProjection = async (payload) => {
    await api.put('/projection', payload);
    fetchData();
  };

  const onAddSaving = async (amount) => {
    if (!amount) return;
    await api.post('/savings', { amount });
    fetchData();
  };

  const onDownloadCsv = () => {
    window.open(`${api.defaults.baseURL}/export/csv`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <main className="mx-auto max-w-6xl p-4">
        <Routes>
          <Route
            path="/"
            element={
              <DashboardPage
                data={{ ...data, totals, expensesByCategory }}
                onAddTransaction={onAddTransaction}
                onSaveProjection={onSaveProjection}
                onDownloadCsv={onDownloadCsv}
              />
            }
          />
          <Route path="/history" element={<HistoryPage transactions={data.transactions} />} />
          <Route path="/savings" element={<SavingsPage savings={data.savings} onAddSaving={onAddSaving} />} />
        </Routes>
      </main>
    </div>
  );
}
