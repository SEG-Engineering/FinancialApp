const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to the SQLite database
const db = new sqlite3.Database(path.resolve(__dirname, '../database/financial_data.db'));

// Route: Upload transactions (POST request)
router.post('/upload', (req, res) => {
    const transactions = req.body; // Expecting JSON array of transactions

    if (!Array.isArray(transactions)) {
        return res.status(400).json({ error: 'Invalid data format. Expecting an array of transactions.' });
    }

    const insertTransaction = `INSERT INTO transactions (date, category, description, amount) VALUES (?, ?, ?, ?)`;

    db.serialize(() => {
        const stmt = db.prepare(insertTransaction);

        transactions.forEach(transaction => {
            stmt.run(transaction.date, transaction.category, transaction.description || null, transaction.amount);
        });

        stmt.finalize();
    });

    res.status(200).json({ message: 'Transactions uploaded successfully!' });
});

// Route: Batch edit transactions (POST request)
router.post('/batch-edit', (req, res) => {
    const updates = req.body; // Expecting an array of updates

    if (!Array.isArray(updates)) {
        return res.status(400).json({ error: 'Invalid data format. Expecting an array of updates.' });
    }

    const updateQuery = `
        UPDATE transactions
        SET date = ?, category = ?, description = ?, amount = ?
        WHERE id = ?
    `;

    db.serialize(() => {
        const stmt = db.prepare(updateQuery);

        updates.forEach(update => {
            if (update.id && update.date && update.category && update.amount) {
                stmt.run(update.date, update.category, update.description || null, update.amount, update.id);
            }
        });

        stmt.finalize();
    });

    res.status(200).json({ message: 'Batch update successful!' });
});

module.exports = router;
