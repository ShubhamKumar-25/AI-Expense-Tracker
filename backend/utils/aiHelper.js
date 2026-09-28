
// const Groq = require("groq-sdk");
// const dotenv = require("dotenv");

// dotenv.config();

// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY,
// });

// exports.categorizeTransaction = async (description) => {
//   try {
//     const completion =
//       await groq.chat.completions.create({
//         model: "openai/gpt-oss-20b",

//         messages: [
//           {
//             role: "system",
//             content: `
// You are an expense categorizer.

// Rules:
// - Food → restaurant, tea, snacks, grocery food
// - Transport → uber, petrol, bus, metro
// - Shopping → clothes, shoes, amazon, electronics
// - Bills → recharge, rent, wifi, subscription
// - Other → everything else

// Reply ONLY one word:
// Food, Transport, Shopping, Bills, Other
//             `,
//           },

//           {
//             role: "user",
//             content: description,
//           },
//         ],

//         temperature: 0,
//       });

//     const raw =
//       completion.choices[0].message.content
//         .trim()
//         .replace(/[^a-zA-Z]/g, "")
//         .toLowerCase();

//     const mapping = {
//       food: "Food",
//       transport: "Transport",
//       shopping: "Shopping",
//       bills: "Bills",
//       other: "Other",
//     };

//     return mapping[raw] || "Other";
//   } catch (err) {
//     console.error(err.message);
//     return "Other";
//   }
// };





const Groq = require("groq-sdk");
const dotenv = require("dotenv");

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// 1. Transaction Categorizer
exports.categorizeTransaction = async (description) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content: `
You are an expense categorizer.

Rules:
- Food → restaurant, tea, snacks, grocery food
- Transport → uber, petrol, bus, metro
- Shopping → clothes, shoes, amazon, electronics
- Bills → recharge, rent, wifi, subscription
- Other → everything else

Reply ONLY one word:
Food, Transport, Shopping, Bills, Other
          `,
        },
        {
          role: "user",
          content: description,
        },
      ],
      temperature: 0,
    });

    const raw = completion.choices[0].message.content
      .trim()
      .replace(/[^a-zA-Z]/g, "")
      .toLowerCase();

    const mapping = {
      food: "Food",
      transport: "Transport",
      shopping: "Shopping",
      bills: "Bills",
      other: "Other",
    };

    return mapping[raw] || "Other";
  } catch (err) {
    console.error("Categorize Error:", err.message);
    return "Other";
  }
};

// 🌟 FEATURE 4: Groq AI Financial Insights Generator
exports.generateFinancialInsights = async (transactions, budget) => {
  try {
    if (!transactions || transactions.length === 0) {
      return "No transaction history available yet. Add some expenses to get AI insights!";
    }

    const summary = transactions.map(
      (t) => `- ${t.description}: ₹${t.amount} (${t.category})`
    ).join("\n");

    const prompt = `
You are a personal AI Financial Advisor. 
Analyze these monthly transactions and budget:

User's Monthly Budget: ₹${budget}
Recent Transactions:
${summary}

Provide:
1. Short analysis of highest spending category.
2. 2 practical tips to cut down unnecessary expenses.
3. Keep it brief, friendly, and structured in bullet points (under 120 words).
    `;

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content: "You are a smart financial advisor providing short actionable budget insights.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.5,
    });

    return completion.choices[0].message.content.trim();
  } catch (err) {
    console.error("Insights Error:", err.message);
    return "Unable to generate AI insights at the moment. Please try again later.";
  }
};