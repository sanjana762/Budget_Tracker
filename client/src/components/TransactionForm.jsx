import { useState } from 'react';

const defaultForm = {
  text: '',
  amount: '',
  category: 'Food',
  date: new Date().toISOString().split('T')[0],
  type: '-',
};

const categories = ['Food', 'Rent', 'Transport', 'Bills', 'Shopping', 'Health', 'Entertainment', 'Salary', 'Other'];

export default function TransactionForm({ onSubmit }) {
  const [form, setForm] = useState(defaultForm);

  const submit = (e) => {
    e.preventDefault();
    const signed = Number(form.amount) * (form.type === '+' ? 1 : -1);
    onSubmit({ ...form, amount: signed });
    setForm({ ...defaultForm, date: form.date });
  };

  return (
    <form className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200" onSubmit={submit}>
      <h2 className="mb-3 text-lg font-semibold">Add Transaction</h2>
      <div className="grid gap-3 md:grid-cols-2">
        <input className="rounded border p-2" placeholder="Description" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} required />
        <div className="flex gap-2">
          <select className="rounded border p-2" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option value="+">+</option>
            <option value="-">-</option>
          </select>
          <input className="w-full rounded border p-2" type="number" min="0" step="0.01" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
        </div>
        <select className="rounded border p-2" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <input className="rounded border p-2" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
      </div>
      <button className="mt-4 rounded bg-sky-600 px-4 py-2 text-white hover:bg-sky-700">Add</button>
    </form>
  );
}
