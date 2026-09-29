import React, { useState } from "react";
import API from "../api/axios"; // 👈 Internal Axios Instance Import
import "./AddTransaction.css";

const AddTransaction = ({ onTransactionAdded }) => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "Auto",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending Data:", formData);

    try {
      // Direct API call
      const res = await API.post("/transactions", formData);

      alert(
        `Added! AI Categorized as: ${res.data.category || formData.category}`,
      );
      setFormData({ description: "", amount: "", category: "Food" });

      if (onTransactionAdded) {
        onTransactionAdded();
      }
    } catch (err) {
      console.error("Error adding transaction:", err);
      if (err.response) {
        console.log("Backend Response:", err.response.data);
      }
    }
  };

  return (
    <div className="add-transaction-card">
      <h3>Add New Transaction</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What did you spend on?"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Amount (₹)"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          required
        />

        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          <option value="Auto">Auto</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit">Save Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;
