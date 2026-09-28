import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import TransactionList from "./TransactionList";
import "./HistoryPage.css";

// 🌟 FEATURE 1 & 3: History Page with Search, Category Filter, and CSV/PDF Export
const HistoryPage = ({ transactions, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Helper to safely format dates from 'date' or 'created_at'
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const parsedDate = new Date(dateString);
    return isNaN(parsedDate.getTime())
      ? "N/A"
      : parsedDate.toLocaleDateString();
  };

  // Filter Logic: Search query + Selected Category
  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.description
      ? t.description.toLowerCase().includes(searchTerm.toLowerCase())
      : false;
    const matchesCategory =
      selectedCategory === "All" || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Extract Unique Categories Dynamic Dropdown
  const categories = [
    "All",
    ...Array.from(new Set(transactions.map((t) => t.category).filter(Boolean))),
  ];

  // CSV Export Logic
  const exportToCSV = () => {
    if (!filteredTransactions || filteredTransactions.length === 0) {
      alert("No transactions to export!");
      return;
    }

    const headers = ["ID", "Description", "Category", "Amount", "Date"];
    const rows = filteredTransactions.map((t) => [
      t.id,
      `"${t.description ? t.description.replace(/"/g, '""') : ""}"`,
      `"${t.category || ""}"`,
      t.amount,
      formatDate(t.date || t.created_at),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `FinAI_Filtered_Transactions_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDF Export Logic
  const exportToPDF = () => {
    if (!filteredTransactions || filteredTransactions.length === 0) {
      alert("No transactions to export!");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(99, 102, 241);
    doc.text("FinAI - Filtered Financial Statement", 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 28);

    const tableColumn = [
      "ID",
      "Description",
      "Category",
      "Amount (INR)",
      "Date",
    ];
    const tableRows = filteredTransactions.map((t) => [
      t.id,
      t.description,
      t.category,
      `INR ${t.amount}`,
      formatDate(t.date || t.created_at),
    ]);

    autoTable(doc, {
      startY: 35,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      headStyles: { fillColor: [99, 102, 241], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [245, 247, 250] },
    });

    const totalAmount = filteredTransactions.reduce(
      (sum, t) => sum + parseFloat(t.amount || 0),
      0,
    );

    const finalY = doc.previousAutoTable ? doc.previousAutoTable.finalY : 40;

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(
      `Total Filtered Expense: INR ${totalAmount.toLocaleString()}`,
      14,
      finalY + 12,
    );

    doc.save(`FinAI_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <div className="container history-page">
      <div className="history-header">
        <h2>Full Transaction History</h2>
        <div className="history-actions">
          <button onClick={exportToCSV} className="add-btn export-csv-btn">
            📊 Export CSV
          </button>
          <button onClick={exportToPDF} className="add-btn export-pdf-btn">
            📄 Download PDF
          </button>
        </div>
      </div>

      {/* Search & Filter Controls Bar */}
      <div className="history-filters">
        <input
          type="text"
          placeholder="🔍 Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="history-search-input"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="history-category-select"
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              Category: {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Filtered Data Render */}
      <TransactionList
        transactions={filteredTransactions}
        refreshData={onRefresh}
      />
    </div>
  );
};

export default HistoryPage;
