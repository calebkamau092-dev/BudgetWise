import TransactionItem from "./TransactionItem";

export default function TransactionHistory({
  transactions,
  onDelete
}) {
  return (
    <section className="transaction-history card">
      <div className="section-header">
        <div>
          <h2>Transaction History</h2>
          <p>Your recent spending activity</p>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="empty-state">
          <h3>No transactions yet</h3>
          <p>
            Your expenses will appear here after you record them.
          </p>
        </div>
      ) : (
        <div className="transaction-list">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}