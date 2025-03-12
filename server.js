const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());


// Import Routes
const userRoutes = require('./routes/users');
const bookRoutes = require('./routes/books');
const borrowRoutes = require('./routes/borrows');
const transactionRoutes = require('./routes/transactions');

// Use Routes
app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/borrows', borrowRoutes);
app.use('/transactions', transactionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
