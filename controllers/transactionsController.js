const pool = require('../config/db');
exports.getTransactions = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Transactions');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
