const form = document.getElementById('transaction-form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const date = document.getElementById('date');
const category = document.getElementById('category');
const list = document.getElementById('transaction-list');
const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const filterDate = document.getElementById('filter-date');
const overview = document.getElementById('overview');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

document.addEventListener("DOMContentLoaded", () => {
  displayTransactions();
  updateLocalStorageTotals(); // Fix: update totals on page load
  updateSummary();
});

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value,
    date: date.value,
    category: category.value.trim() || "Uncategorized"
  };

  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateLocalStorageTotals(); // update totals after new transaction
  displayTransactions();
  updateSummary();
  form.reset();
});

function displayTransactions(filtered = null) {
  const txnsToRender = filtered || transactions;
  list.innerHTML = '';
  txnsToRender.forEach(addToDOM);
}

function addToDOM(transaction) {
  const sign = transaction.amount > 0 ? '+' : '-';
  const item = document.createElement('li');
  item.classList.add(transaction.amount > 0 ? 'plus' : 'minus');

  item.innerHTML = `
    <div>
      <strong>${transaction.text}</strong><br/>
      <small>${transaction.date}</small><br/>
      <em>${transaction.category}</em>
    </div>
    <div>
      <span>${sign}₹${Math.abs(transaction.amount)}</span>
      <button onclick="removeTransaction(${transaction.id})">Del</button>
    </div>
  `;
  list.appendChild(item);
}

function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateLocalStorageTotals(); // update totals after deletion
  displayTransactions();
  updateSummary();
}

function updateLocalStorageTotals() {
  const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0);

  localStorage.setItem("totalIncome", totalIncome.toString());
  localStorage.setItem("totalExpense", totalExpense.toString());
}

function updateSummary() {
  const totalIncome = parseFloat(localStorage.getItem("totalIncome")) || 0;
  const totalExpense = parseFloat(localStorage.getItem("totalExpense")) || 0;
  const totalBalance = totalIncome + totalExpense;

  income.textContent = `+₹${totalIncome.toFixed(2)}`;
  expense.textContent = `-₹${Math.abs(totalExpense).toFixed(2)}`;
  balance.textContent = `₹${totalBalance.toFixed(2)}`;
}

function setProjectedIncome() {
  const projected = prompt("Enter your projected income:");
  if (projected !== null && projected.trim() !== "") {
    localStorage.setItem("projectedIncome", parseFloat(projected).toString());
    alert("Projected income saved!");
  }
}

function setProjectedExpense() {
  const projected = prompt("Enter your projected expenses:");
  if (projected !== null && projected.trim() !== "") {
    localStorage.setItem("projectedExpense", parseFloat(projected).toString());
    alert("Projected expense saved!");
  }
}

function exportCSV() {
  const headers = ['Description', 'Amount', 'Date', 'Category'];
  const rows = transactions.map(t => [t.text, t.amount, t.date, t.category]);

  let csv = headers.join(',') + '\n';
  rows.forEach(r => {
    csv += r.join(',') + '\n';
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'transactions.csv';
  a.click();
}

function resetData() {
  if (confirm("Are you sure you want to delete all transactions?")) {
    localStorage.clear();
    transactions = [];
    displayTransactions();
    updateSummary();
    if (window.expChart) window.expChart.destroy();
    overview.classList.add('hidden');
  }
}

function filterByMonth() {
  const selected = filterDate.value;
  if (!selected) return displayTransactions();

  const filtered = transactions.filter(t => t.date.startsWith(selected));
  displayTransactions(filtered);
}

// 👇 OVERVIEW FUNCTION
function generateOverview() {
  const incomeTxns = transactions.filter(t => t.amount > 0);
  const expenseTxns = transactions.filter(t => t.amount < 0);

  const income = incomeTxns.reduce((sum, t) => sum + t.amount, 0);
  const expenses = expenseTxns.reduce((sum, t) => sum + t.amount, 0); // negative
  const balance = income + expenses;

  const projectedIncome = parseFloat(localStorage.getItem("projectedIncome")) || 0;
  const projectedExpense = parseFloat(localStorage.getItem("projectedExpense")) || 0;

  // Update DOM
  document.getElementById('o-income').textContent = `₹${income.toFixed(2)}`;
  document.getElementById('o-expenses').textContent = `₹${Math.abs(expenses).toFixed(2)}`;
  document.getElementById('o-balance').textContent = `₹${balance.toFixed(2)}`;

  document.getElementById('o-income-diff').textContent = `+₹${(income - projectedIncome).toFixed(2)}`;
  document.getElementById('o-expenses-diff').textContent = `-₹${(Math.abs(expenses) - projectedExpense).toFixed(2)}`;
  document.getElementById('o-balance-diff').textContent = `₹${(balance - (projectedIncome - projectedExpense)).toFixed(2)}`;

  // Bar Chart
  const categoryTotals = {};
  expenseTxns.forEach(t => {
    if (!categoryTotals[t.category]) categoryTotals[t.category] = 0;
    categoryTotals[t.category] += Math.abs(t.amount);
  });

  const ctx = document.getElementById('expenseChart').getContext('2d');
  if (window.expChart) window.expChart.destroy();
  window.expChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(categoryTotals),
      datasets: [{
        label: 'Actual Expenses',
        data: Object.values(categoryTotals),
        backgroundColor: '#ff6b6b'
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });

  overview.classList.remove("hidden");
}

// 👇 TOGGLE TRANSACTIONS SECTION
const toggleBtn = document.getElementById('toggle-transactions');
const txnContainer = document.getElementById('transaction-container');

toggleBtn.addEventListener('click', () => {
  txnContainer.classList.toggle('hidden');
  toggleBtn.textContent = txnContainer.classList.contains('hidden')
    ? 'Show Transactions'
    : 'Hide Transactions';
});
