import { useState } from 'react';

export default function SavingsPage({ savings, onAddSaving }) {
  const [amount, setAmount] = useState('');

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-semibold">Savings</h2>
        <p className="text-2xl font-bold text-emerald-700">₹{savings.total.toFixed(2)}</p>
      </div>
      <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <h3 className="mb-2 font-semibold">Add to Savings</h3>
        <div className="flex gap-2">
          <input className="w-full rounded border p-2" type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
          <button
            className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
            onClick={() => {
              onAddSaving(Number(amount));
              setAmount('');
            }}
          >
            Save
          </button>
        </div>
      </div>
      <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <h3 className="mb-2 font-semibold">Savings History</h3>
        <div className="space-y-2">
          {savings.history.length ? (
            savings.history.map((entry) => (
              <div key={entry.id} className="flex justify-between rounded border p-2 text-sm">
                <span>{entry.date}</span>
                <span>₹{entry.amount.toFixed(2)}</span>
              </div>
            ))
          ) : (
            <p className="text-slate-500">No savings added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
