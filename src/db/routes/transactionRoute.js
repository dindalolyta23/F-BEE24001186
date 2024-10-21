const express = require('express');
const { transferMoney, getAllTransactions, getTransactionDetails } = require('../controllers/transactionController');

const router = express.Router();

router.post('/transactions', transferMoney);
router.get('/transactions', getAllTransactions);
router.get('/transactions/:transactionId', getTransactionDetails);

module.exports = router;
