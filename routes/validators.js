const validator = require('validator');

const validateTransaction = (transaction) => {
    if (!transaction.date || !validator.isDate(transaction.date)) {
        return 'Invalid date format.';
    }
    if (!transaction.category || typeof transaction.category !== 'string') {
        return 'Category must be a string.';
    }
    if (!transaction.amount || typeof transaction.amount !== 'number' || transaction.amount <= 0) {
        return 'Amount must be a positive number.';
    }
    return null;
};

module.exports = { validateTransaction };
