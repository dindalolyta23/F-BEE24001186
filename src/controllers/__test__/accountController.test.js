const { addNewAccount, getAllAccounts, getAccountById } = require('../accountController');
const accountService = require('../../services/accountService');

jest.mock('../../services/accountService');

describe('accountController', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            body: {},
            params: {},
        };
        res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
    });

    describe('addNewAccount', () => {
        it('should return 201 and the new account', async () => {
            const newAccount = { 
                userId: 1,
                bankName: "Bank Dinda 3",
                bankAccountNumber: "1234567899",
                balance: 3000000
            };

            const mockResponse = {
                "id": 1,
                "user_id": 1,
                "bank_name": "Bank Dinda 3",
                "bank_account_number": "1234567899",
                "balance": "3000000",
                "createdAt": "2024-11-02T17:50:16.288Z",
                "updatedAt": null,
                "deletedAt": null
            };
            
            accountService.createAccount.mockResolvedValue(mockResponse);
            req.body = newAccount;

            await addNewAccount(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockResponse);

        });

        it('should return 400 when the request body is invalid', async () => {
            const newAccount = { 
                userId: 1,
                bankName: "Bank Dinda 3",
                bankAccountNumber: "1234567899",
                balance: -3000000
            };

            const error = {
                details: [
                    {
                        message: '"balance" must be greater than 0',
                    },
                ],
            };

            accountService.createAccount.mockResolvedValue(newAccount);
            req.body = newAccount;

            await addNewAccount(req, res);

            expect(res.status).toHaveBeenCalledWith(400);

            expect(res.json).toHaveBeenCalledWith({ error: error.details[0].message });

        });

        it('should return 500', async () => {
            const newAccount = { 
                userId: 1,
                bankName: "Bank Dinda 3",
                bankAccountNumber: "1234567899",
                balance: 3000000
            };

            accountService.createAccount.mockRejectedValue(new Error('Failed to create account'));
            req.body = newAccount;

            await addNewAccount(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Failed to create account' });
        });
    });

    describe('getAllAccounts', () => {
        it('should return 200 and all accounts', async () => {
            const accounts = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];
            accountService.getAccounts.mockResolvedValue(accounts);

            await getAllAccounts(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(accounts);
        });

        it('should return 500 and an error message when accountService.getAccounts throws an error', async () => {
            accountService.getAccounts.mockRejectedValue(new Error('Failed to get accounts'));

            await getAllAccounts(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Failed to get accounts' });
        });
    });

    describe('getAccountById', () => {
        it('should return 200 and the account with the given ID', async () => {
            const account = { id: 1, name: 'John Doe' };
            accountService.getAccountDetails.mockResolvedValue(account);
            req.params.accountId = '1';

            await getAccountById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(account);
        });

        it('should return 404 and an error message when the account with the given ID is not found', async () => {
            accountService.getAccountDetails.mockResolvedValue(null);
            req.params.accountId = '1';

            await getAccountById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Account not found' });

        });

        it('should return 500 and an error message when accountService.getAccountDetails throws an error', async () => {
            accountService.getAccountDetails.mockRejectedValue(new Error('Failed to get account'));
            req.params.accountId = '1';

            await getAccountById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Failed to get account' });
        });

    });

});
