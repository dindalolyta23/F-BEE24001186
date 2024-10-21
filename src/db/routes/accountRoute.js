const express = require('express');
const { addNewAccount, getAllAccounts, getAccountById } = require('../controllers/accountController');

const router = express.Router();

router.post('/accounts', addNewAccount);
router.get('/accounts', getAllAccounts);
router.get('/accounts/:accountId', getAccountById);

module.exports = router;
