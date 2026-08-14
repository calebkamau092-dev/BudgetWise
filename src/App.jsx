import { useEffect, useState } from "react";
import { loadTransactions, saveTransactions } from "./utils/localStorage";

// Components
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import BalanceCard from "./components/BalanceCard";
import IncomeCard from "./components/IncomeCard";
import ExpenseCard from "./components/ExpenseCard";
import AddTransaction from "./components/AddTransaction";
import TransactionHistory from "./components/TransactionHistory";

// Styles
import "./styles/App.css";
import "./styles/Dashboard.css";
import "./styles/Navbar.css";
import "./styles/Transaction.css";
import "./styles/Form.css";

const demoTransactions = [
  {
    id: 1,
    title: "Monthly Salary",
    description: "Monthly Salary",
    amount: 90000,
    category: "Salary",
    type: "income",
    date: "2026-08-01",
    status: "Completed",
  },
  {
    id: 2,
    title: "Rent",
    description: "Rent",
    amount: 22000,
    category: "Housing",
    type: "expense",
    date: "2026-08-03",
    status: "Completed",
  },
  {
    id: 3,
    title: "Groceries",
    description: "Groceries",
    amount: 7500,
    category: "Food",
    type: "expense",
    date: "2026-08-04",
    status: "Completed",
  },
  {
    id: 4,
    title: "Transport",
    description: "Transport",
    amount: 2800,
    category: "Transport",
    type: "expense",
    date: "2026-08-05",
    status: "Completed",
  },
];

function App() {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = loadTransactions();
    return savedTransactions.length > 0 ? savedTransactions : demoTransactions;
  });
  const [page, setPage] = useState("dashboard");
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  const income = safeTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const expenses = safeTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const balance = income - expenses;

  const handleDeleteTransaction = (transactionId) => {
    setTransactions((currentTransactions) =>
      currentTransactions.filter((transaction) => transaction.id !== transactionId)
    );
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setPage("add");
  };

  const renderContent = () => {
    if (page === "add") {
      return (
        <section className="form-section">
          <AddTransaction
            transactions={safeTransactions}
            setTransactions={setTransactions}
            editingTransaction={editingTransaction}
            onCancelEdit={() => setEditingTransaction(null)}
          />
        </section>
      );
    }

    if (page === "transactions") {
      return (
        <section className="history-section">
          <TransactionHistory
            transactions={safeTransactions}
            onDelete={handleDeleteTransaction}
            onEdit={handleEditTransaction}
          />
        </section>
      );
    }

    if (page === "reports") {
      const categoryTotals = safeTransactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((totals, transaction) => {
          const category = transaction.category || "Other";
          totals[category] = (totals[category] || 0) + Number(transaction.amount || 0);
          return totals;
        }, {});

      const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
      const monthlySavings = income - expenses;
      const savingsRate = income > 0 ? (monthlySavings / income) * 100 : 0;

      return (
        <section className="history-section">
          <div className="report-panel">
            <h2>Monthly Report</h2>

            <div className="report-grid">
              <div className="report-card">
                <span>Total Income</span>
                <strong>KES {income.toLocaleString()}</strong>
              </div>
              <div className="report-card">
                <span>Total Expenses</span>
                <strong>KES {expenses.toLocaleString()}</strong>
              </div>
              <div className="report-card">
                <span>Net Savings</span>
                <strong>KES {monthlySavings.toLocaleString()}</strong>
              </div>
              <div className="report-card">
                <span>Savings Rate</span>
                <strong>{savingsRate.toFixed(1)}%</strong>
              </div>
            </div>

            <div className="report-section">
              <h3>Top Expense Category</h3>
              <p>
                {topCategory
                  ? `${topCategory[0]}: KES ${topCategory[1].toLocaleString()}`
                  : "No expense data yet"}
              </p>
            </div>

            <div className="report-section">
              <h3>Spending by Category</h3>
              <div className="category-list">
                {Object.entries(categoryTotals).length > 0 ? (
                  Object.entries(categoryTotals)
                    .sort((a, b) => b[1] - a[1])
                    .map(([category, total]) => (
                      <div key={category} className="category-row">
                        <span>{category}</span>
                        <strong>KES {total.toLocaleString()}</strong>
                      </div>
                    ))
                ) : (
                  <p className="muted">No expense categories recorded yet.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      );
    }

    if (page === "about") {
      return (
        <section className="history-section">
          <div className="empty-state">
            <h3>About BudgetWise</h3>
            <p>Track your income, expenses, and balance in one place.</p>
          </div>
        </section>
      );
    }

    return (
      <>
        <Dashboard transactions={safeTransactions} setPage={setPage} />

        <section className="cards">
          <BalanceCard balance={balance} />
          <IncomeCard income={income} />
          <ExpenseCard expenses={expenses} />
        </section>
      </>
    );
  };

  return (
    <div className="app">
      <Navbar page={page} setPage={setPage} />
      {renderContent()}
    </div>
  );
}

export default App;