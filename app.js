const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middleware
app.use(helmet());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests
});
app.use(limiter);

// Middleware for parsing JSON
app.use(bodyParser.json());

// Import Routes
const transactionRoutes = require('./routes/transactions');
const reportRoutes = require('./routes/reports');

// Use Routes
app.use('/transactions', transactionRoutes);
app.use('/reports', reportRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
