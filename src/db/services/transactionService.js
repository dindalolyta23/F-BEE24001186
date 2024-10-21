const {prisma} = require('../index');

const createTransaction = async (data) => {
  return await prisma.transaction.create({
    data: {
      amount: data.amount,
      source_account_id: data.source_account_id,
      destination_account_id: data.destination_account_id
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
