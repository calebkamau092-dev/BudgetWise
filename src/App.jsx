<<<<<<< HEAD
import { useState } from "react";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

import "./App.css";

function App() {

  // This is the main transaction data for the application.
  // Later, this data can come from a database or API.
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      title: "Salary",
      type: "income",
      amount: 80000,
    },
    {
      id: 2,
      title: "Food",
      type: "expense",
      amount: 8000,
    },
    {
      id: 3,
      title: "Transport",
      type: "expense",
      amount: 5000,
    },
  ]);

  return (
    <>
      <Navbar />

      <Dashboard transactions={transactions} />
    </>
  );
}

export default App;
=======

import { useEffect, useState } from "react";
import { loadTransactions, saveTransactions } from "./utils/localStorage";
import AddTransaction from "./Components/AddTransaction";

// CSS
import "./styles/App.css";
import "./styles/Dashboard.css";
import "./styles/Navbar.css";
import "./styles/Transaction.css";
import "./styles/Form.css";
=======

import { useEffect, useState } from 'react';
import { loadTransactions, saveTransactions } from './utils/localStorage';
import './styles/App.css';
import './styles/Dashboard.css';
import './styles/Navbar.css';
import './styles/Transaction.css';
import './styles/Form.css';
import AddTransaction from "./Components/AddTransaction";


function App() {
  const [transactions, setTransactions] = useState(() => loadTransactions());

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  return (
    <div className="app">
      <AddTransaction
        transactions={transactions}
        setTransactions={setTransactions}
      />
    </div>
  );
}

export default App;
>>>>>>> origin/main
