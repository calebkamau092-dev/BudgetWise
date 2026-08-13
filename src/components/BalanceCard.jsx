function BalanceCard({ balance }) {

  return (
    <div className="card">

      <div className="card-top">
        <h3>Balance</h3>

        <div className="card-icon">
          💳
        </div>
      </div>

      <h2>KES {balance.toLocaleString()}</h2>

      <p>Your current balance</p>

    </div>
  );
}

export default BalanceCard;