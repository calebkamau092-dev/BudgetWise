import TransactionForm from "./TransactionForm";


function AddTransaction() {
  return (
    <div className="transaction-page">
      <div className="header">
        <h1>Add Transaction</h1>
        <p>Record a new income or expense</p>
      </div>

      <TransactionForm />
    </div>
  );
}

export default AddTransaction;