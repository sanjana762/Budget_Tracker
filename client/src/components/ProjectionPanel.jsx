import { useState } from 'react';

export default function ProjectionPanel({ projection, onSave }) {
  const [income, setIncome] = useState(projection.projectedIncome || 0);
  const [outcome, setOutcome] = useState(projection.projectedOutcome || 0);

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <h2 className="mb-3 text-lg font-semibold">Projected Income / Outcome</h2>
      <div className="grid gap-2 md:grid-cols-2">
        <input className="rounded border p-2" type="number" min="0" step="0.01" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="Projected Income" />
        <input className="rounded border p-2" type="number" min="0" step="0.01" value={outcome} onChange={(e) => setOutcome(e.target.value)} placeholder="Projected Outcome" />
      </div>
      <button
        className="mt-3 rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        onClick={() => onSave({ projectedIncome: Number(income), projectedOutcome: Number(outcome) })}
      >
        Save Projection
      </button>
    </div>
  );
}
