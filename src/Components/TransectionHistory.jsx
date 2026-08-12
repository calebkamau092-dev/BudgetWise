import { useEffect, useState } from "react";
import api from "../api";
import TransactionHistory from "../components/TransactionHistory";

const categories = [
  "Food",
  "Transport",
  "Rent",
  "Entertainment",
  "Education",
  "Shopping",
  "Other"
];

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);

  const [form, setForm] = useState({
    amount: "",
    category: "Food",
    description: "",
    date: new Date().toISOString().slice(0, 10)
  });

  const [error, setError] = useState("");

  const loadExpenses = async () => {
    try {
      const response = await api.get("/expenses");
      setExpenses(response.data);
    } catch (error) {
      setError("Unable to load transactions.");
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    try {
      await api.post("/expenses", {
        amount: Number(form.amount),
        category: form.category,
        description: form.description,
        date: form.date
      });

      setForm({
        amount: "",
        category: "Food",
        description: "",
        date: new Date().toISOString().slice(0, 10)
      });

      loadExpenses();
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Unable to save transaction."
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/expenses/${id}`);

      setExpenses(
        expenses.filter((expense) => expense.id !== id)
      );
    } catch (error) {
      setError("Unable to delete transaction.");
    }
  };

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Transactions</h1>
          <p>Record and manage your daily expenses.</p>
        </div>
      </div>

      {error && (
        <div className="alert danger">
          {error}
        </div>
      )}

      <form
        className="card expense-form"
        onSubmit={handleSubmit}
      >
        <h2>Add Transaction</h2>

        <div className="form-row">
          <div>
            <label>Amount</label>

            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              min="1"
              step="0.01"
              value={form.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Category</label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div>
            <label>Description</label>

            <input
              type="text"
              name="description"
              placeholder="e.g. Lunch"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Date</label>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button
          className="primary"
          type="submit"
        >
          Add Transaction
        </button>
      </form>

      <TransactionHistory
        transactions={expenses}
        onDelete={handleDelete}
      />
    </div>
  );
}