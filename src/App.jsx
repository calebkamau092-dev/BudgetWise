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