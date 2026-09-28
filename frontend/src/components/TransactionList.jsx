import React from "react";
import API from "../api/axios"; // 👈 Direct axios ki jagah hamara Centralized API instance use karo
import "./TransactionList.css";

const TransactionList = ({ transactions, refreshData }) => {
  const handleDelete = async (id) => {
    if (!id) {
      alert("Invalid Transaction ID");
      return;
    }

    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        // API Instance token auto-attach kar dega
        await API.delete(`/transactions/${id}`);
        console.log("Deleted ID:", id);

        if (typeof refreshData === "function") {
          refreshData();
        }
      } catch (err) {
        console.error("Delete failed", err);
        alert("Could not delete the item. Please try again.");
      }
    }
  };

  return (
    <div className="list-container">
      <h3>Recent Transactions</h3>
      <div className="transaction-items">
        {transactions && transactions.length > 0 ? (
          transactions.map((t) => {
            // MongoDB ID handle karne ke liye (_id ya id)
            const transactionId = t._id || t.id;

            return (
              <div key={transactionId} className="t-item">
                <div className="t-info">
                  <span className="t-desc">{t.description}</span>
                  <span className="t-cat">{t.category}</span>
                </div>
                <div className="t-amount-area">
                  <span className="t-amount">₹{t.amount}</span>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(transactionId)}
                    title="Delete Transaction"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ textAlign: "center", padding: "20px", color: "#94a3b8" }}>
            No transactions found.
          </p>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
