const {prisma} = require('../index');

const createAccount = async (data) => {
  return await prisma.account.create({
    data: {
      balance: data.balance,
      userId: data.userId
    }
  });
};

const getAccounts = async () => {
  return await prisma.account.findMany();
};

const getAccountDetails = async (accountId) => {
  return await prisma.account.findUnique({ where: { id: parseInt(accountId) } });
};

module.exports = { createAccount, getAccounts, getAccountDetails };
