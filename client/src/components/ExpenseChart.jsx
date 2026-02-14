import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart({ expensesByCategory }) {
  const labels = Object.keys(expensesByCategory);
  const values = Object.values(expensesByCategory);

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <h2 className="mb-3 text-lg font-semibold">Expense Distribution</h2>
      {values.length ? (
        <div className="mx-auto max-w-sm">
          <Pie
            data={{
              labels,
              datasets: [
                {
                  data: values,
                  backgroundColor: ['#f97316', '#ef4444', '#eab308', '#3b82f6', '#14b8a6', '#6366f1', '#22c55e', '#8b5cf6'],
                },
              ],
            }}
          />
        </div>
      ) : (
        <p className="text-slate-500">No expense data yet.</p>
      )}
    </div>
  );
}
