const db = require('../config/db');
const { categorizeTransaction } = require('../utils/aiHelper');

// 1. Add New Transaction (Logged-in user ke liye)
exports.addTransaction = async (req, res) => {
    try {
        let { description, amount, category } = req.body;
        const userId = req.user.id; // Auth middleware se aayega

        // Force AI if category is Auto or empty
        if (category === "Auto" || !category) {
            category = await categorizeTransaction(description);
        }

        const query = 'INSERT INTO transactions (description, amount, category, user_id) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(query, [description, amount, category, userId]);
        
        res.status(201).json({ 
            message: "Transaction added!", 
            category: category, 
            id: result.insertId,
            user_id: userId
        });
    } catch (err) {
        console.error("Controller Error:", err);
        res.status(500).json({ error: err.message });
    }
};

// 2. Get Transactions (Sirf Logged-in user ke transactions fetch honge)
exports.getTransactions = async (req, res) => {
    try {
        const userId = req.user.id;
        const [rows] = await db.query(
            'SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC',
            [userId]
        );
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Delete Transaction (Security check: Sirf apne account ka transaction delete ho sake)
exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        
        await db.query('DELETE FROM transactions WHERE id = ? AND user_id = ?', [id, userId]);
        res.status(200).json({ message: "Transaction deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};