export default function SummaryCards({ totals }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card title="Total Balance" value={`₹${totals.balance.toFixed(2)}`} color="text-slate-900" />
      <Card title="Income" value={`+₹${totals.income.toFixed(2)}`} color="text-emerald-600" />
      <Card title="Expenses" value={`-₹${Math.abs(totals.expense).toFixed(2)}`} color="text-rose-600" />
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <h3 className="text-sm text-slate-500">{title}</h3>
      <p className={`mt-1 text-2xl font-semibold ${color}`}>{value}</p>
    </div>
  );
}
