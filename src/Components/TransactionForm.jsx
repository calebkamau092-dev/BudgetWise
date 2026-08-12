import { useState } from "react";

function TransactionForm() {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "Salary",
    type: "income",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.amount || !formData.date) {
      alert("Please fill in all fields.");
      return;
    }

    console.log(formData);

    alert("Transaction Added Successfully!");

    setFormData({
      name: "",
      amount: "",
      category: "Salary",
      type: "income",
      date: "",
    });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Transaction Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="e.g. Grocery Shopping"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount (KSh)</label>
          <input
            id="amount"
            type="number"
            name="amount"
            placeholder="0.00"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option>Salary</option>
            <option>Food</option>
            <option>Shopping</option>
            <option>Transport</option>
            <option>Bills</option>
            <option>Health</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="type">Transaction Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="add-button">
          Add Transaction
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;