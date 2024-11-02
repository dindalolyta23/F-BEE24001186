const express = require('express');
const { transferMoney, getAllTransactions, getTransactionDetails } = require('../controllers/transactionController');

const router = express.Router();

router.post('/', transferMoney);
router.get('/', getAllTransactions);
router.get('/:transactionId', getTransactionDetails);

module.exports = router;
