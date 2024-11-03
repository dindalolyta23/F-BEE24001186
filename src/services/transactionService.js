const {prisma} = require('../configs/database');

const createTransaction = async (data) => {
  return await prisma.transaction.create({
    data: {
      amount: data.amount,
      source_account_id: data.sourceAccountId,
      destination_account_id: data.destinationAccountId
    },
  });
};

const getTransactions = async () => {
  return await prisma.transaction.findMany();
};

const getTransactionById = async (transactionId) => {
  return await prisma.transaction.findUnique({
    where: { id: parseInt(transactionId) },
  });
};

module.exports = { createTransaction, getTransactions, getTransactionById };
