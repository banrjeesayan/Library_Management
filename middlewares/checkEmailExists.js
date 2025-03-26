const pool = require('../config/db');

const checkEmailExists = async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required." });
    }

    try {
        const result = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
        if (result.rowCount > 0) {
            return res.status(400).json({ message: "Email already taken. Please use another email." });
        }
        next(); 
    } catch (error) {
        res.status(500).json({ error: "Database error while checking email" });
    }
};

module.exports = checkEmailExists;
