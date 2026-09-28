import React, { useState } from "react";
import "./SummaryCards.css";

const SummaryCards = ({ transactions, budget, setBudget }) => {
  const [isEditing, setIsEditing] = useState(false);
  const totalExpense = transactions.reduce(
    (sum, t) => sum + parseFloat(t.amount),
    0,
  );
  const remainingBalance = budget - totalExpense;

  return (
    <div className="summary-container">
      <div className="card balance-card">
        <h4>Remaining Balance</h4>
        <p className={remainingBalance < 5000 ? "low-balance" : ""}>
          ₹{remainingBalance.toLocaleString()}
        </p>

        <div className="budget-settings">
          {isEditing ? (
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              onBlur={() => setIsEditing(false)}
              autoFocus
              className="budget-input"
            />
          ) : (
            <small
              onClick={() => setIsEditing(true)}
              style={{ cursor: "pointer" }}
            >
              Budget: ₹{Number(budget).toLocaleString()} ✏️
            </small>
          )}
        </div>
      </div>

      <div className="card expense-card">
        <h4>Total Spent</h4>
        <p>₹{totalExpense.toLocaleString()}</p>
        <small>{transactions.length} Transactions</small>
      </div>

      <div className="card status-card">
        <h4>Savings Rate</h4>
        <p>
          {budget > 0 ? ((remainingBalance / budget) * 100).toFixed(0) : 0}%
        </p>
        <small>Of Total Budget</small>
      </div>
    </div>
  );
};

export default SummaryCards;
