const { prisma } = require('../configs/database');

const createAccount = async (data) => {
  return await prisma.bank_account.create({
    data: {
      balance: data.balance,
      user_id: data.userId,
      bank_name : data.bankName,
      bank_account_number : data.bankAccountNumber
    }
  });
};

const getAccounts = async () => {
  return await prisma.bank_account.findMany();
};

const getAccountDetails = async (accountId) => {
  return await prisma.bank_account.findUnique({ where: { id: parseInt(accountId) } });
};

module.exports = { createAccount, getAccounts, getAccountDetails };
