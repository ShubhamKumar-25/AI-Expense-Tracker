// import React from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import "./FinanceChart.css";

// const COLORS = [
//   "#6366f1",
//   "#22c55e",
//   "#ef4444",
//   "#eab308",
//   "#ec4899",
//   "#8b5cf6",
// ];

// const FinanceChart = ({ data = [] }) => {
//   // Category-wise total calculation
//   const chartData = data.reduce((acc, item) => {
//     const existing = acc.find((c) => c.name === item.category);
//     if (existing) {
//       existing.value += parseFloat(item.amount) || 0;
//     } else {
//       acc.push({ name: item.category, value: parseFloat(item.amount) || 0 });
//     }
//     return acc;
//   }, []);

//   return (
//     <div className="chart-container">
//       <h3>Expense Breakdown</h3>
//       <div className="chart-wrapper">
//         <ResponsiveContainer
//           width="100%"
//           height={300}
//           minWidth={0}
//           minHeight={300}
//         >
//           <PieChart>
//             <Pie
//               data={
//                 chartData.length > 0
//                   ? chartData
//                   : [{ name: "No Data", value: 1 }]
//               }
//               innerRadius={60}
//               outerRadius={80}
//               paddingAngle={5}
//               dataKey="value"
//             >
//               {chartData.length > 0 ? (
//                 chartData.map((entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={COLORS[index % COLORS.length]}
//                   />
//                 ))
//               ) : (
//                 <Cell fill="#334155" />
//               )}
//             </Pie>
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "#1e293b",
//                 border: "none",
//                 borderRadius: "8px",
//                 color: "#fff",
//               }}
//               itemStyle={{ color: "#fff" }}
//             />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default FinanceChart;

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./FinanceChart.css";

const COLORS = [
  "#6366f1",
  "#22c55e",
  "#ef4444",
  "#eab308",
  "#ec4899",
  "#8b5cf6",
];

const FinanceChart = ({ data = [] }) => {
  // Category-wise total calculation
  const chartData = data.reduce((acc, item) => {
    const existing = acc.find((c) => c.name === item.category);
    if (existing) {
      existing.value += parseFloat(item.amount) || 0;
    } else {
      acc.push({ name: item.category, value: parseFloat(item.amount) || 0 });
    }
    return acc;
  }, []);

  return (
    <div className="chart-container">
      <h3>Expense Breakdown</h3>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={
                chartData.length > 0
                  ? chartData
                  : [{ name: "No Data", value: 1 }]
              }
              innerRadius="55%"
              outerRadius="75%"
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.length > 0 ? (
                chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))
              ) : (
                <Cell fill="#334155" />
              )}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
              itemStyle={{ color: "#fff" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinanceChart;
