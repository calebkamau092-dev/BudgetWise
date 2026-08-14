import "../styles/Dashboard.css";

function Dashboard({ transactions = [], setPage = () => {} }) {
  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  // Get all transactions that are income.
  const incomeTransactions = safeTransactions.filter(
    (transaction) => transaction.type === "income"
  );

  // Get all transactions that are expenses.
  const expenseTransactions = safeTransactions.filter(
    (transaction) => transaction.type === "expense"
  );

  // Add all income amounts together.
  const income = incomeTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  // Add all expense amounts together.
  const expenses = expenseTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  // Balance is the money left after expenses.
  const balance = income - expenses;

  return (
    <main className="dashboard">

      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Here is an overview of your finances.</p>
        </div>

        <div className="dashboard-actions">
          <button className="secondary-button"
            onClick={() => setPage("transactions")}
          >
            View Transactions
          </button>

          <button className="add-button"
            onClick={() => setPage("add")}
          >
            + Add Transaction
          </button>
        </div>
      </div>

      <div className="cards">
        <div className="card">
          <div className="card-top">
            <h3>Balance</h3>
            <div className="card-icon">💳</div>
          </div>
          <h2>KES {balance.toLocaleString()}</h2>
          <p>Your current balance</p>
        </div>

        <div className="card">
          <div className="card-top">
            <h3>Income</h3>
            <div className="card-icon">📈</div>
          </div>
          <h2>KES {income.toLocaleString()}</h2>
          <p>Total income</p>
        </div>

        <div className="card">
          <div className="card-top">
            <h3>Expenses</h3>
            <div className="card-icon">📉</div>
          </div>
          <h2>KES {expenses.toLocaleString()}</h2>
          <p>Total expenses</p>
        </div>
      </div>

      <div className="transactions">

        <h2>Recent Transactions</h2>

        {safeTransactions.map((transaction) => (
          <div className="transaction" key={transaction.id}>

            <div>
              <h3>{transaction.title}</h3>

              <p>{transaction.type}</p>
            </div>

            <strong
              className={
                transaction.type === "income"
                  ? "income-amount"
                  : "expense-amount"
              }
            >
              {transaction.type === "income" ? "+" : "-"}
              KES {transaction.amount.toLocaleString()}
            </strong>

          </div>
        ))}

      </div>

    </main>
  );
}

export default Dashboard;