const { createAccount, getAccounts, getAccountDetails } = require('../db/services/accountService');

const addNewAccount = async (req, res) => {
  try {
    const account = await createAccount(req.body);
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllAccounts = async (req, res) => {
  try {
    const accounts = await getAccounts();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAccountById = async (req, res) => {
  try {
    const account = await getAccountDetails(req.params.accountId);
    if (account) {
      res.status(200).json(account);
    } else {
      res.status(404).json({ message: 'Account not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addNewAccount,getAllAccounts, getAccountById };
