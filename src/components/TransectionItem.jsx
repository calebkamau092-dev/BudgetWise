function TransactionItem({ transaction }) {
  const isIncome = transaction.type === "income";

  return (
    <div className="transaction-item">
      <div className="transaction-info">
        <h3>{transaction.description}</h3>
        <p>{transaction.category}</p>
      </div>

      <div className="transaction-date">
        {transaction.date}
      </div>

      <div
        className={`transaction-amount ${
          isIncome ? "income" : "expense"
        }`}
      >
        {isIncome ? "+" : "-"} KSh{" "}
        {transaction.amount.toLocaleString()}
      </div>

      <span className="transaction-status">
        {transaction.status}
      </span>
    </div>
  );
}

export default TransactionItem;
