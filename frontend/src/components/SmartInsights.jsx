import React, { useState } from "react";
import API from "../api/axios"; // Adjust path if your axios.js is elsewhere (e.g. "../../api/axios")

const SmartInsights = ({ transactions, budget }) => {
  const [insights, setInsights] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAIInsights = async () => {
    setLoading(true);
    try {
      const res = await API.post("/ai-insights", {
        transactions,
        budget,
      });
      setInsights(res.data.insights);
    } catch (err) {
      console.error("AI Insights Error:", err);
      const errorMsg =
        err.response?.data?.error ||
        "Failed to fetch AI Insights. Please check backend connection & GROQ_API_KEY.";
      setInsights(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#1e293b",
        border: "1px solid #a855f7",
        borderRadius: "12px",
        padding: "20px",
        marginTop: "20px",
        boxShadow: "0 4px 15px rgba(168, 85, 247, 0.15)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            color: "#eab308",
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          🤖 Groq AI Financial Advisor
        </h3>
        <button
          onClick={fetchAIInsights}
          disabled={loading}
          className="add-btn"
          style={{
            backgroundColor: "#8b5cf6",
            padding: "8px 16px",
            fontSize: "0.85rem",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Analyzing..." : "✨ Generate AI Advice"}
        </button>
      </div>

      {insights && (
        <div
          style={{
            marginTop: "15px",
            backgroundColor: "#0f172a",
            padding: "15px",
            borderRadius: "8px",
            color: "#f8fafc",
            lineHeight: "1.6",
            whiteSpace: "pre-line",
            fontSize: "0.95rem",
            borderLeft: "4px solid #a855f7",
          }}
        >
          {insights}
        </div>
      )}
    </div>
  );
};

export default SmartInsights;
