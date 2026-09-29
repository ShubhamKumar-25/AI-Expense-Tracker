const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const transactionRoutes = require('./routes/transactionRoutes');
const { generateFinancialInsights } = require("./utils/aiHelper");
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

// 🌟 100% Dynamic CORS Setup
const allowedOrigins = [
  "http://localhost:5173", // Local Vite Frontend
  "http://localhost:3000", // Local React Default Port (Fallback)
  process.env.FRONTEND_URL  // Vercel / Netlify Live Frontend URL (Env Var)
].filter(Boolean); 

app.use(cors({
  origin: function (origin, callback) {
    // Postman / Mobile Apps / Server-to-Server requests
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app') || origin.endsWith('.netlify.app')) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy: Access Denied for this origin."));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/auth', authRoutes);

// 🌟 Path: '/api/ai-insights'
app.post("/api/ai-insights", async (req, res) => {
  try {
    const { transactions, budget } = req.body;
    const insights = await generateFinancialInsights(transactions, budget);
    res.json({ insights });
  } catch (err) {
    console.error("AI Insights Error:", err.message);
    res.status(500).json({ error: "Failed to generate AI insights" });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.send("API is running smoothly on Render! 🚀");
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});