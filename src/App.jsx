<<<<<<< HEAD
import AddTransaction from "./Components/AddTransaction";

function App() {
  return (
    <div>
      <AddTransaction />
=======
import { useEffect, useState } from 'react';
import { loadTransactions, saveTransactions } from './utils/localStorage';
import './styles/App.css';
import './styles/Dashboard.css';
import './styles/Navbar.css';
import './styles/Transaction.css';
import './styles/Form.css';

function App() {
  const [transactions, setTransactions] = useState(() => loadTransactions());

  const [form, setForm] = useState({
    title: '',
    type: 'expense',
    category: 'Food',
    amount: '',
  });

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  const income = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const balance = income - expenses;

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title || !form.amount) {
      alert('Please enter a title and amount.');
      return;
    }

    const newTransaction = {
      id: Date.now(),
      title: form.title,
      type: form.type,
      category: form.category,
      amount: Number(form.amount),
      date: new Date().toISOString().split('T')[0],
    };

    setTransactions([newTransaction, ...transactions]);

    setForm({
      title: '',
      type: 'expense',
      category: 'Food',
      amount: '',
    });
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="brand">
          <span className="brand-icon">₿</span>
          <span>BudgetWise</span>
        </div>

        <div className="nav-links">
          <a href="#dashboard">Dashboard</a>
          <a href="#transactions">Transactions</a>
          <a href="#reports">Reports</a>
          <a href="#about">About</a>
        </div>

        <button className="add-button" onClick={() => document.getElementById('transaction-form')?.scrollIntoView()}>
          + Add Transaction
        </button>
      </nav>

      <main>
        <section className="hero" id="dashboard">
          <div>
            <span className="hero-label">Personal Finance Tracker</span>

            <h1>
              Take Control of
              <br />
              Your Finances
            </h1>

            <p>
              Track your income, monitor expenses and build better
              budgeting habits with BudgetWise.
            </p>

            <div className="hero-buttons">
              <button onClick={() => document.getElementById('transaction-form')?.scrollIntoView()}>
                Get Started
              </button>

              <button
                className="secondary-button"
                onClick={() => document.getElementById('transactions')?.scrollIntoView()}
              >
                View Transactions
              </button>
            </div>
          </div>

          <div className="hero-balance">
            <span>Total Balance</span>
            <strong>KSh {balance.toLocaleString()}</strong>
          </div>
        </section>

        <section className="cards">
          <div className="summary-card balance-card">
            <span>Current Balance</span>
            <strong>KSh {balance.toLocaleString()}</strong>
            <small>Updated now</small>
          </div>

          <div className="summary-card income-card">
            <span>Total Income</span>
            <strong>KSh {income.toLocaleString()}</strong>
            <small>This month</small>
          </div>

          <div className="summary-card expense-card">
            <span>Total Expenses</span>
            <strong>KSh {expenses.toLocaleString()}</strong>
            <small>This month</small>
          </div>

          <div className="summary-card savings-card">
            <span>Monthly Savings</span>
            <strong>KSh {Math.max(balance, 0).toLocaleString()}</strong>
            <small>Current balance</small>
          </div>
        </section>

        <section className="content-grid">
          <div className="dashboard-panel">
            <h2>Monthly Income vs Expenses</h2>
            <p>Current transaction summary</p>

            <div className="simple-chart">
              <div>
                <span style={{ height: `${Math.min(income / 100, 180)}px` }}></span>
                <small>Income</small>
              </div>

              <div>
                <span style={{ height: `${Math.min(expenses / 100, 180)}px` }}></span>
                <small>Expenses</small>
              </div>
            </div>
          </div>

          <div className="dashboard-panel">
            <h2>Expense Categories</h2>
            <p>Breakdown by category</p>

            <div className="category-list">
              {['Food', 'Transport', 'Bills', 'Shopping', 'Entertainment'].map(
                (category) => {
                  const total = transactions
                    .filter(
                      (transaction) =>
                        transaction.type === 'expense' &&
                        transaction.category === category
                    )
                    .reduce(
                      (sum, transaction) => sum + Number(transaction.amount),
                      0
                    );

                  return (
                    <div className="category-row" key={category}>
                      <span>{category}</span>
                      <strong>KSh {total.toLocaleString()}</strong>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </section>

        <section className="form-section" id="transaction-form">
          <h2>Add Transaction</h2>

          <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Salary"
                />
              </div>

              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Type</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option>Food</option>
                  <option>Transport</option>
                  <option>Bills</option>
                  <option>Shopping</option>
                  <option>Entertainment</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="add-button">
                Add Transaction
              </button>
            </div>
          </form>
        </section>

        <section className="transactions-section" id="transactions">
          <div className="section-heading">
            <div>
              <h2>Recent Transactions</h2>
              <p>Latest activity</p>
            </div>
          </div>

          <div className="transaction-list">
            {transactions.length === 0 ? (
              <p className="empty-state">No transactions yet.</p>
            ) : (
              transactions.slice(0, 10).map((transaction) => (
                <div className="transaction-item" key={transaction.id}>
                  <div>
                    <strong>{transaction.title}</strong>
                    <span>
                      {transaction.category} · {transaction.date}
                    </span>
                  </div>

                  <div
                    className={
                      transaction.type === 'income'
                        ? 'transaction-income'
                        : 'transaction-expense'
                    }
                  >
                    {transaction.type === 'income' ? '+' : '-'}KSh{' '}
                    {Number(transaction.amount).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <footer>
        <strong>BudgetWise</strong>
        <span>Smart Spending Starts Here</span>
      </footer>
>>>>>>> main
    </div>
  );
}

export default App;