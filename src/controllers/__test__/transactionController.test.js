// const { createTransaction, getTransactions, getTransactionById } = require('../db/services/transactionService');

// const transferMoney = async (req, res) => {
//   try {
//     const transaction = await createTransaction(req.body);
//     res.status(201).json(transaction);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getAllTransactions = async (req, res) => {
//   try {
//     const transactions = await getTransactions();
//     res.status(200).json(transactions);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getTransactionDetails = async (req, res) => {
//   try {
//     const transaction = await getTransactionById(req.params.transactionId);
//     if (transaction) {
//       res.status(200).json(transaction);
//     } else {
//       res.status(404).json({ message: 'Transaction not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = { transferMoney, getAllTransactions, getTransactionDetails };

// Unit Testing for Controller transactionController.js
const { createTransaction, getTransactions, getTransactionById } = require('../../db/services/transactionService');
const { transferMoney, getAllTransactions, getTransactionDetails } = require('../transactionController');

jest.mock('../../db/services/transactionService');

describe('transactionController', () => {
    describe('transferMoney', () => {
        it('should create a new transaction', async () => {
            const mockData = {
                "id": 1,
                "amount": 100000,
                "source_account_id": 1,
                "destination_account_id": 2,
                "createdAt": "2024-10-29T00:00:00.000Z",
                "updatedAt": "2024-10-29T00:00:00.000Z",
                "deletedAt": null
            };

            const req = {
                body: {
                    amount: 100000,
                    source_account_id: 1,
                    destination_account_id: 2
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            createTransaction.mockResolvedValue(mockData);

            await transferMoney(req, res);

            expect(createTransaction).toHaveBeenCalledTimes(1);
            expect(createTransaction).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockData);
        });

        it('should return error when failed to create a new transaction', async () => {
            const req = {
                body: {
                    amount: 100000,
                    source_account_id: 1,
                    destination_account_id: 2
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            createTransaction.mockRejectedValue(new Error('Failed to create transaction'));

            await transferMoney(req, res);

            expect(createTransaction).toHaveBeenCalledTimes(2);
            expect(createTransaction).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Failed to create transaction' });
        });
    });

    describe('getAllTransactions', () => {
        it('should get all transactions', async () => {
            const mockData = [
                {
                    "id": 1,
                    "amount": 100000,
                    "source_account_id": 1,
                    "destination_account_id": 2,
                    "createdAt": "2024-10-29T00:00:00.000Z",
                    "updatedAt": "2024-10-29T00:00:00.000Z",
                    "deletedAt": null
                }
            ];

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            getTransactions.mockResolvedValue(mockData);

            await getAllTransactions(req, res);

            expect(getTransactions).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockData);
        });
    });

    describe('getTransactionDetails', () => {
        it('should get transaction details by id', async () => {
            const mockData = {
                "id": 1,
                "amount": 100000,
                "source_account_id": 1,
                "destination_account_id": 2,
                "createdAt": "2024-10-29T00:00:00.000Z",
                "updatedAt": "2024-10-29T00:00:00.000Z",
                "deletedAt": null
            };

            const req = {
                params: {
                    transactionId: 1
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            getTransactionById.mockResolvedValue(mockData);

            await getTransactionDetails(req, res);

            expect(getTransactionById).toHaveBeenCalledTimes(1);
            expect(getTransactionById).toHaveBeenCalledWith(req.params.transactionId);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockData);
        });

        it('should return error when transaction not found', async () => {
            const req = {
                params: {
                    transactionId: 1
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            getTransactionById.mockResolvedValue(null);

            await getTransactionDetails(req, res);

            expect(getTransactionById).toHaveBeenCalledTimes(2);
            expect(getTransactionById).toHaveBeenCalledWith(req.params.transactionId);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Transaction not found' });
        });

        it('should return error when failed to get transaction details', async () => {
            const req = {
                params: {
                    transactionId: 1
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            getTransactionById.mockRejectedValue(new Error('Failed to get transaction details'));

            await getTransactionDetails(req, res);

            expect(getTransactionById).toHaveBeenCalledTimes(3);
            expect(getTransactionById).toHaveBeenCalledWith(req.params.transactionId);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Failed to get transaction details' });
        });
    });

});

