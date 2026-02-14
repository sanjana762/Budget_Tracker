const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'data', 'budget.json');

app.use(cors());
app.use(express.json());

function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get('/api/budget', (req, res) => {
  res.json(readData());
});

app.post('/api/transactions', (req, res) => {
  const data = readData();
  const transaction = {
    id: Date.now(),
    text: req.body.text,
    amount: Number(req.body.amount),
    category: req.body.category || 'Other',
    date: req.body.date,
  };
  data.transactions.unshift(transaction);
  writeData(data);
  res.status(201).json(transaction);
});

app.put('/api/projection', (req, res) => {
  const data = readData();
  data.projection = {
    projectedIncome: Number(req.body.projectedIncome || 0),
    projectedOutcome: Number(req.body.projectedOutcome || 0),
  };
  writeData(data);
  res.json(data.projection);
});

app.post('/api/savings', (req, res) => {
  const amount = Number(req.body.amount || 0);
  if (amount <= 0) return res.status(400).json({ message: 'Amount must be greater than zero' });

  const data = readData();
  const record = {
    id: Date.now(),
    amount,
    date: new Date().toISOString().split('T')[0],
  };
  data.savings.total += amount;
  data.savings.history.unshift(record);
  writeData(data);
  res.status(201).json(record);
});

app.get('/api/export/csv', (req, res) => {
  const data = readData();
  const header = 'id,text,amount,category,date';
  const rows = data.transactions.map((t) => [t.id, escapeCsv(t.text), t.amount, escapeCsv(t.category), t.date].join(','));
  const csv = [header, ...rows].join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="budget-history.csv"');
  res.send(csv);
});

function escapeCsv(value) {
  const stringValue = String(value ?? '');
  if (stringValue.includes(',') || stringValue.includes('"')) {
    return '"' + stringValue.replace(/"/g, '""') + '"';
  }
  return stringValue;
}

app.listen(PORT, () => {
  console.log(`Budget API running on http://localhost:${PORT}`);
});
