
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
