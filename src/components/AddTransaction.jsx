import TransactionForm from "./TransactionForm";
import "../styles/Transaction.css";

function AddTransaction({
  transactions,
  setTransactions,
  editingTransaction = null,
  onCancelEdit = () => {},
}) {
  return (
    <div className="transaction-page">
      <div className="header">
        <h1>{editingTransaction ? "Edit Transaction" : "Add Transaction"}</h1>
        <p>
          {editingTransaction
            ? "Update the selected income or expense"
            : "Record a new income or expense"}
        </p>
      </div>

      <TransactionForm
        transactions={transactions}
        setTransactions={setTransactions}
        editingTransaction={editingTransaction}
        onCancelEdit={onCancelEdit}
      />
    </div>
  );
}

export default AddTransaction;