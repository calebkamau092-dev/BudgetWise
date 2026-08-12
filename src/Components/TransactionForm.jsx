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

    if (
      !formData.name ||
      !formData.amount ||
      !formData.date
    ) {
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
    <form onSubmit={handleSubmit}>

      <label>Transaction Name</label>
      <input
        type="text"
        name="name"
        placeholder="e.g Grocery Shopping"
        value={formData.name}
        onChange={handleChange}
      />

      <label>Amount (KSh)</label>
      <input
        type="number"
        name="amount"
        placeholder="0.00"
        value={formData.amount}
        onChange={handleChange}
      />

      <label>Category</label>
      <select
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

      <label>Transaction Type</label>

      <div>
        <label>
          <input
            type="radio"
            name="type"
            value="income"
            checked={formData.type === "income"}
            onChange={handleChange}
          />
          Income
        </label>

        <label>
          <input
            type="radio"
            name="type"
            value="expense"
            checked={formData.type === "expense"}
            onChange={handleChange}
          />
          Expense
        </label>
      </div>

      <label>Date</label>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />

      <button type="submit">
        Add Transaction
      </button>

    </form>
  );
}

export default TransactionForm;