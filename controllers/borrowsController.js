const pool = require('../config/db');

exports.borrowBook = async (req, res) => {
    try {
        const { user_id, book_id } = req.body;
        const borrow_date = new Date();
        const return_date = new Date();
        return_date.setDate(return_date.getDate() + 14);

        const bookCheck = await pool.query('SELECT copies_available FROM Books WHERE id = $1', [book_id]);
        if (bookCheck.rowCount === 0) return res.status(404).json({ message: 'Book not found' });

        if (bookCheck.rows[0].copies_available < 1) {
            return res.status(400).json({ message: 'No copies available for borrowing' });
        }

        const result = await pool.query(
            'INSERT INTO Borrowed_Books (user_id, book_id, borrow_date, return_date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user_id, book_id, borrow_date, return_date, 'Borrowed']
        );

        await pool.query('UPDATE Books SET copies_available = copies_available - 1 WHERE id = $1', [book_id]);

        res.status(201).json({ message: 'Book borrowed successfully', borrow: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.returnBook = async (req, res) => {
    try {
        const { id } = req.params;

        const borrowCheck = await pool.query('SELECT * FROM Borrowed_Books WHERE id = $1 AND status = $2', [id, 'Borrowed']);
        if (borrowCheck.rowCount === 0) {
            return res.status(404).json({ message: 'Borrow record not found or already returned' });
        }

        const result = await pool.query('UPDATE Borrowed_Books SET status = $1 WHERE id = $2 RETURNING *', ['Returned', id]);
        await pool.query('UPDATE Books SET copies_available = copies_available + 1 WHERE id = $1', [borrowCheck.rows[0].book_id]);

        res.json({ message: 'Book returned successfully', updatedBorrow: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
