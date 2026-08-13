function ExpenseCard({ expenses }) {

  return (
    <div className="card">

      <div className="card-top">
        <h3>Expenses</h3>

        <div className="card-icon">
          📉
        </div>
      </div>

      <h2>KES {expenses.toLocaleString()}</h2>

      <p>Total expenses</p>

    </div>
  );
}

export default ExpenseCard;