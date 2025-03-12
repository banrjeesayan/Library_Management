const pool = require('../config/db');

exports.createTransaction = async (req, res) => {
    try {
        const { user_id, book_id, amount, status } = req.body;
        const transaction_date = new Date();

        const result = await pool.query(
            'INSERT INTO Transactions (user_id, book_id, amount, transaction_date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user_id, book_id, amount, transaction_date, status]
        );

        res.status(201).json({ message: 'Transaction recorded successfully', transaction: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Transactions');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
