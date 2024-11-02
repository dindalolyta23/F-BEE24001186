const express = require('express');
const { addNewAccount, getAllAccounts, getAccountById } = require('../controllers/accountController');

const router = express.Router();

router.post('/', addNewAccount);
router.get('/', getAllAccounts);
router.get('/:accountId', getAccountById);

module.exports = router;
