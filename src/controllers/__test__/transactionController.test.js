const { createTransaction, getTransactions, getTransactionById } = require('../../services/transactionService');
const { transferMoney, getAllTransactions, getTransactionDetails } = require('../transactionController');

jest.mock('../../services/transactionService');

describe('transactionController', () => {
    describe('transferMoney', () => {
        it('should transfer money successfully', async () => {
            const mockData = {
                "id": 1,
                "amount": 100000,
                "source_account_id": 1,
                "destination_account_id": 2
            };

            const req = {
                body: {
                    amount: 100000,
                    sourceAccountId: 1,
                    destinationAccountId: 2
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

        it('should return error when validation failed', async () => {
            const req = {
                body: {
                    amount: 100000,
                    sourceAccountId: 1,
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const mockError = {
                error: '"destinationAccountId" is required'
            };

            await transferMoney(req, res);

            expect(createTransaction).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(mockError);
        });

        it('should return error when failed to transfer money', async () => {
            const req = {
                body: {
                    amount: 100000,
                    sourceAccountId: 1,
                    destinationAccountId: 2
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            createTransaction.mockRejectedValue(new Error('Failed to transfer money'));

            await transferMoney(req, res);

            expect(createTransaction).toHaveBeenCalledTimes(2);
            expect(createTransaction).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Failed to transfer money' });
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

        it('should return error when failed to get all transactions', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            getTransactions.mockRejectedValue(new Error('Failed to get transactions'));

            await getAllTransactions(req, res);

            expect(getTransactions).toHaveBeenCalledTimes(2);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Failed to get transactions' });
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

