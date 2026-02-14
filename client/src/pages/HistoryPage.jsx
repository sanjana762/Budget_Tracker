export default function HistoryPage({ transactions }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <h2 className="mb-3 text-lg font-semibold">Transaction History</h2>
      <div className="space-y-2">
        {transactions.length ? (
          transactions.map((txn) => (
            <div key={txn.id} className="flex items-center justify-between rounded border p-2">
              <div>
                <p className="font-medium">{txn.text}</p>
                <p className="text-xs text-slate-500">{txn.date} • {txn.category}</p>
              </div>
              <span className={txn.amount >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                {txn.amount >= 0 ? '+' : '-'}₹{Math.abs(txn.amount).toFixed(2)}
              </span>
            </div>
          ))
        ) : (
          <p className="text-slate-500">No transactions yet.</p>
        )}
      </div>
    </div>
  );
}
