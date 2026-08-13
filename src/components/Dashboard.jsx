import BalanceCard from "./BalanceCard";
import IncomeCard from "./IncomeCard";
import ExpenseCard from "./ExpenseCard";
import "../styles/Dashboard.css";
import AddTransaction from "./AddTransaction";

function Dashboard({ transactions, setPage }) {

  // Get all transactions that are income.
  const incomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income"
  );

  // Get all transactions that are expenses.
  const expenseTransactions = transactions.filter(
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

        <button className="add-button"
          onClick={() => setPage("add")}
        >
          + Add Transaction
        </button>
      </div>

      <div className="cards">

        <BalanceCard balance={balance} />

        <IncomeCard income={income} />

        <ExpenseCard expenses={expenses} />

      </div>

      <div className="transactions">

        <h2>Recent Transactions</h2>

        {transactions.map((transaction) => (
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