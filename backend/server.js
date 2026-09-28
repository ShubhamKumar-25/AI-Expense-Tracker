const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const transactionRoutes = require('./routes/transactionRoutes');
const { generateFinancialInsights } = require("./utils/aiHelper");
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/auth', authRoutes);

// 🌟 Path fix: '/api/ai-insights'
app.post("/api/ai-insights", async (req, res) => {
  try {
    const { transactions, budget } = req.body;
    const insights = await generateFinancialInsights(transactions, budget);
    res.json({ insights });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate AI insights" });
  }
});

app.get('/', (req, res) => {
    res.send("API is running on 5000...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});