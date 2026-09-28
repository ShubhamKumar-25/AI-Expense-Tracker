import React from "react";
import "./BudgetAlert.css";

// 🌟 FEATURE 2: Dynamic Budget Warning Alert Banner
const BudgetAlert = ({ totalExpense, budget }) => {
  const budgetUsagePercent = budget > 0 ? (totalExpense / budget) * 100 : 0;

  if (budgetUsagePercent < 80) return null;

  const isExceeded = budgetUsagePercent >= 100;

  return (
    <div
      className={`budget-alert ${
        isExceeded ? "budget-alert-danger" : "budget-alert-warning"
      }`}
    >
      {isExceeded
        ? `⚠️ WARNING: You have exceeded your monthly budget of ₹${Number(
            budget,
          ).toLocaleString()}! (Used: ${budgetUsagePercent.toFixed(0)}%)`
        : `⚠️ ALERT: You have used ${budgetUsagePercent.toFixed(
            0,
          )}% of your monthly budget (₹${Number(budget).toLocaleString()})!`}
    </div>
  );
};

export default BudgetAlert;
