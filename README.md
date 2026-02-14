# Budget Tracker (React + Tailwind + Express)

A full-stack budget tracker rebuilt with:
- **Frontend:** React + Tailwind CSS
- **Backend:** Node.js + Express
- **Charts:** Pie chart for expense categories

## Features Implemented
- Responsive **dropdown navbar** with routes:
  - Dashboard
  - History
  - Savings
- Add transactions with:
  - Description
  - **+ / - sign selector**
  - Amount
  - Date
  - **Category select options**
- Automatic totals:
  - Balance
  - Income
  - Expenses
- **Projected income and projected outcome** panel
- **Pie chart** showing expenses by category
- **History page** for all transactions
- **Savings page** to add and track savings
- **CSV export** button for full transaction history
- Placeholder section for future **recommendation system**

## Run locally
```bash
npm install
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3001/api`

## Build frontend
```bash
npm run build
```


## Vercel Deployment
For Vercel, this project outputs the frontend build to `client/dist`.
A root `vercel.json` is included so Vercel can detect:
- `buildCommand`: `npm run build`
- `outputDirectory`: `client/dist`
