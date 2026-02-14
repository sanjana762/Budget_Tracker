import ExpenseChart from '../components/ExpenseChart';
import ProjectionPanel from '../components/ProjectionPanel';
import SummaryCards from '../components/SummaryCards';
import TransactionForm from '../components/TransactionForm';

export default function DashboardPage({ data, onAddTransaction, onSaveProjection, onDownloadCsv }) {
  return (
    <div className="space-y-4">
      <SummaryCards totals={data.totals} />
      <TransactionForm onSubmit={onAddTransaction} />
      <ProjectionPanel projection={data.projection} onSave={onSaveProjection} />
      <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <h2 className="mb-2 text-lg font-semibold">Projection Summary</h2>
        <p>Projected Balance: ₹{(data.projection.projectedIncome - data.projection.projectedOutcome).toFixed(2)}</p>
        <p>Actual Balance: ₹{data.totals.balance.toFixed(2)}</p>
        <p>Difference: ₹{(data.totals.balance - (data.projection.projectedIncome - data.projection.projectedOutcome)).toFixed(2)}</p>
      </div>
      <ExpenseChart expensesByCategory={data.expensesByCategory} />
      <button className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700" onClick={onDownloadCsv}>
        Download CSV History
      </button>
      <div className="rounded-xl bg-amber-50 p-4 text-amber-900 ring-1 ring-amber-200">
        <h3 className="font-semibold">Recommendation System (Planned)</h3>
        <p className="text-sm">A smart model-based recommendation feature can be added next to suggest ways to reduce expenses and improve savings.</p>
      </div>
    </div>
  );
}
