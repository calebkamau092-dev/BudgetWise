import { useEffect, useState } from "react";
import { loadTransactions, saveTransactions } from "./utils/localStorage";

import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import BalanceCard from "./Components/BalanceCard";
import IncomeCard from "./Components/IncomeCard";
import ExpenseCard from "./Components/ExpenseCard";
import AddTransaction from "./Components/AddTransaction";
import TransactionHistory from "./Components/TransactionHistory";

import "./styles/App.css";
import "./styles/Navbar.css";
import "./styles/Dashboard.css";
import "./styles/Transaction.css";
import "./styles/Form.css";

function App() {
  const [transactions, setTransactions] = useState(() => loadTransactions());

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  return (
    <div className="app">
      <Navbar />

      <Dashboard />

      <section className="cards">
        <BalanceCard transactions={transactions} />
        <IncomeCard transactions={transactions} />
        <ExpenseCard transactions={transactions} />
      </section>

      <section id="transaction-form">
        <AddTransaction
          transactions={transactions}
          setTransactions={setTransactions}
        />
      </section>

      <TransactionHistory
        transactions={transactions}
        setTransactions={setTransactions}
      />
    </div>
  );
}

export default App;