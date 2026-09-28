// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import axios from "axios";
// import Navbar from "./components/Navbar";
// import AddTransaction from "./components/AddTransaction";
// import TransactionList from "./components/TransactionList";
// import FinanceChart from "./components/FinanceChart";
// import SummaryCards from "./components/SummaryCards";
// import SmartInsights from "./components/SmartInsights";
// import HistoryPage from "./components/HistoryPage";
// import GoProPage from "./components/GoProPage";
// import BudgetAlert from "./components/BudgetAlert";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import "./App.css";

// // 🌟 Protected Route Wrapper Component (SessionStorage check)
// const ProtectedRoute = ({ children }) => {
//   const token = sessionStorage.getItem("token");
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// };

// function App() {
//   const [transactions, setTransactions] = useState([]);
//   const [refresh, setRefresh] = useState(false);

//   // Budget State with SessionStorage
//   const [budget, setBudget] = useState(() => {
//     const savedBudget = sessionStorage.getItem("userBudget");
//     return savedBudget ? JSON.parse(savedBudget) : 50000;
//   });

//   useEffect(() => {
//     sessionStorage.setItem("userBudget", JSON.stringify(budget));
//   }, [budget]);

//   // Fetch Transactions with Bearer Token
//   const fetchTransactions = async () => {
//     const token = sessionStorage.getItem("token");
//     if (!token) return;

//     try {
//       const res = await axios.get("http://localhost:5000/api/transactions", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setTransactions(res.data);
//     } catch (err) {
//       console.error("Fetch Error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, [refresh]);

//   const handleRefresh = () => setRefresh(!refresh);

//   const totalExpense = transactions.reduce(
//     (sum, t) => sum + parseFloat(t.amount || 0),
//     0,
//   );

//   return (
//     <Router>
//       <div className="App">
//         <Navbar />

//         <BudgetAlert totalExpense={totalExpense} budget={budget} />

//         <Routes>
//           {/* Public Auth Routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />

//           {/* Protected Dashboard Route */}
//           <Route
//             path="/"
//             element={
//               <ProtectedRoute>
//                 <main className="container">
//                   <div className="hero-section">
//                     <h2>Financial Overview</h2>
//                   </div>

//                   <SummaryCards
//                     transactions={transactions}
//                     budget={budget}
//                     setBudget={setBudget}
//                   />

//                   {/* 🌟 FEATURE 4: Smart Groq AI Insights */}
//                   <SmartInsights transactions={transactions} budget={budget} />

//                   <div className="dashboard-grid">
//                     <div className="left-panel">
//                       <AddTransaction onTransactionAdded={handleRefresh} />
//                       <FinanceChart data={transactions} />
//                     </div>
//                     <div className="right-panel">
//                       <TransactionList
//                         transactions={transactions.slice(0, 5)}
//                         refreshData={handleRefresh}
//                       />
//                       <p className="last-entries-note">
//                         Showing last 5 entries
//                       </p>
//                     </div>
//                   </div>
//                 </main>
//               </ProtectedRoute>
//             }
//           />

//           {/* Protected History Route */}
//           <Route
//             path="/history"
//             element={
//               <ProtectedRoute>
//                 <HistoryPage
//                   transactions={transactions}
//                   onRefresh={handleRefresh}
//                 />
//               </ProtectedRoute>
//             }
//           />

//           {/* Protected Go Pro Route */}
//           <Route
//             path="/gopro"
//             element={
//               <ProtectedRoute>
//                 <GoProPage />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import API from "./api/axios"; // 👈 Centralized Axios import kiya

import Navbar from "./components/Navbar";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";
import FinanceChart from "./components/FinanceChart";
import SummaryCards from "./components/SummaryCards";
import SmartInsights from "./components/SmartInsights";
import HistoryPage from "./components/HistoryPage";
import GoProPage from "./components/GoProPage";
import BudgetAlert from "./components/BudgetAlert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

// 🌟 Protected Route Wrapper Component
const ProtectedRoute = ({ children }) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [transactions, setTransactions] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Budget State
  const [budget, setBudget] = useState(() => {
    const savedBudget =
      localStorage.getItem("userBudget") ||
      sessionStorage.getItem("userBudget");
    return savedBudget ? JSON.parse(savedBudget) : 50000;
  });

  useEffect(() => {
    localStorage.setItem("userBudget", JSON.stringify(budget));
  }, [budget]);

  // Fetch Transactions using API Instance
  const fetchTransactions = async () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) return;

    try {
      const res = await API.get("/transactions"); // 👈 Header automatically added by interceptor
      setTransactions(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [refresh]);

  const handleRefresh = () => setRefresh(!refresh);

  const totalExpense = transactions.reduce(
    (sum, t) => sum + parseFloat(t.amount || 0),
    0,
  );

  return (
    <Router>
      <div className="App">
        <Navbar />

        <BudgetAlert totalExpense={totalExpense} budget={budget} />

        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Dashboard Route */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <main className="container">
                  <div className="hero-section">
                    <h2>Financial Overview</h2>
                  </div>

                  <SummaryCards
                    transactions={transactions}
                    budget={budget}
                    setBudget={setBudget}
                  />

                  <SmartInsights transactions={transactions} budget={budget} />

                  <div className="dashboard-grid">
                    <div className="left-panel">
                      <AddTransaction onTransactionAdded={handleRefresh} />
                      <FinanceChart data={transactions} />
                    </div>
                    <div className="right-panel">
                      <TransactionList
                        transactions={transactions.slice(0, 5)}
                        refreshData={handleRefresh}
                      />
                      <p className="last-entries-note">
                        Showing last 5 entries
                      </p>
                    </div>
                  </div>
                </main>
              </ProtectedRoute>
            }
          />

          {/* Protected History Route */}
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <HistoryPage
                  transactions={transactions}
                  onRefresh={handleRefresh}
                />
              </ProtectedRoute>
            }
          />

          {/* Protected Go Pro Route */}
          <Route
            path="/gopro"
            element={
              <ProtectedRoute>
                <GoProPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
