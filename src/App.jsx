import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import AddTransaction from "./components/AddTransaction";
import TransactionHistory from "./components/TransactionHistory";
import { loadTransactions, saveTransactions } from "./utils/localStorage";
import "./styles/App.css";


function App() {
  // Which page is currently visible.
  const [page, setPage] = useState("dashboard");

  // All transactions, loaded from localStorage on first render.
  const [transactions, setTransactions] = useState(() => loadTransactions());

  // Whenever transactions change, save them back to localStorage.
  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  return (
    <div className="app">
      <Navbar page={page} setPage={setPage} />

      {page === "dashboard" && <Dashboard transactions={transactions} />}

      {page === "add" && (
        <AddTransaction
          transactions={transactions}
          setTransactions={setTransactions}
        />
      )}

      {page === "transactions" && (
        <TransactionHistory transactions={transactions} />
      )}

      {page === "reports" && (
        <main className="dashboard">
          <div className="dashboard-header">
            <div>
              <h1>Reports</h1>
              <p>Coming soon.</p>
            </div>
          </div>
        </main>
      )}

      {page === "about" && (
        <main className="dashboard">
          <div className="dashboard-header">
            <div>
              <h1>About BudgetWise</h1>
              <p>
                BudgetWise helps you track income, expenses, and savings in
                one simple dashboard.
              </p>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;