import { useState } from "react";
import TransactionItem from "./TransactionItem";
import "../styles/Transaction.css";

function TransactionHistory({ transactions }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || transaction.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="transaction-history">
      <div className="history-header">
        <div>
          <h2>Transaction History</h2>
          <p>View and manage your recent transactions</p>
        </div>

        <span>
          {filteredTransactions.length} Transactions
        </span>
      </div>

      <div className="transaction-filters">
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Income">Income</option>
        </select>
      </div>

      <div className="transaction-list">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
            />
          ))
        ) : (
          <div className="empty-state">
            <h3>No transactions found</h3>
            <p>Try changing your search or category filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default TransactionHistory;