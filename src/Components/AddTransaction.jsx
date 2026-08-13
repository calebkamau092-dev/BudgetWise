import TransactionForm from "./TransactionForm";
import "../styles/Form.css";
import "../styles/Transaction.css";

function AddTransaction({ transactions, setTransactions }) {
  return (
    <div className="transaction-page">
      <div className="header">
        <h1>Add Transaction</h1>
        <p>Record a new income or expense</p>
      </div>

      <TransactionForm
        transactions={transactions}
        setTransactions={setTransactions}
      />
    </div>
  );
}

export default AddTransaction;