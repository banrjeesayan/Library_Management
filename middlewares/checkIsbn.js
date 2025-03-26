const pool = require('../config/db');

const checkIsbn = async (req, res, next) => {
    try {
        const { isbn } = req.body;

        
        if (!isbn) {
            return res.status(400).json({ message: 'ISBN is required' });
        }

        
        const result = await pool.query('SELECT * FROM Books WHERE isbn = $1', [isbn]);

        if (result.rowCount > 0) {
            return res.status(409).json({ message: 'ISBN number already taken' });
        }

        next(); 
    } catch (error) {
        console.error('Error checking ISBN:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = checkIsbn;
