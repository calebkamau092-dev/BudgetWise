function IncomeCard({ income }) {

  return (
    <div className="card">

      <div className="card-top">
        <h3>Income</h3>

        <div className="card-icon">
          📈
        </div>
      </div>

      <h2>KES {income.toLocaleString()}</h2>

      <p>Total income</p>

    </div>
  );
}

export default IncomeCard;