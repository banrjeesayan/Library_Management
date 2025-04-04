const express = require('express');
require('dotenv').config();
const cors = require("cors");


const app = express();
app.use(express.json());


app.use(cors({
    origin: "*", // Allow all origins (not recommended for production)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"] // Allowed headers
}));

// Import Routes
const userRoutes = require('./routes/users');
const bookRoutes = require('./routes/books');
const borrowRoutes = require('./routes/borrows');
const transactionRoutes = require('./routes/transactions');
const booksRoutes = require('./routes/books');



// Use Routes
app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/borrows', borrowRoutes);
app.use('/transactions', transactionRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
