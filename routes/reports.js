const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to the SQLite database
const db = new sqlite3.Database(path.resolve(__dirname, '../database/financial_data.db'));

// Route: Generate spending report with optional filters
router.get('/summary', (req, res) => {
    const { startDate, endDate, category } = req.query;

    // Base SQL query
    let reportQuery = `
        SELECT category, SUM(amount) AS total
        FROM transactions
    `;
    const params = [];

    // Add filters based on query parameters
    if (startDate && endDate) {
        reportQuery += ` WHERE date BETWEEN ? AND ?`;
        params.push(startDate, endDate);
    } else if (category) {
        reportQuery += ` WHERE category = ?`;
        params.push(category);
    }

    reportQuery += ` GROUP BY category`;

    // Execute the query
    db.all(reportQuery, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json({ report: rows });
    });
});

module.exports = router;
