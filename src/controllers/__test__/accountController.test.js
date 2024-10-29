// const { createAccount, getAccounts, getAccountDetails } = require('../db/services/accountService');

// const addNewAccount = async (req, res) => {
//   try {
//     const account = await createAccount(req.body);
//     res.status(201).json(account);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getAllAccounts = async (req, res) => {
//   try {
//     const accounts = await getAccounts();
//     res.status(200).json(accounts);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getAccountById = async (req, res) => {
//   try {
//     const account = await getAccountDetails(req.params.accountId);
//     if (account) {
//       res.status(200).json(account);
//     } else {
//       res.status(404).json({ message: 'Account not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = { addNewAccount,getAllAccounts, getAccountById };

// Unit test for the accountController.js file
const { addNewAccount, getAllAccounts, getAccountById } = require('../accountController');
const accountService = require('../../db/services/accountService');

jest.mock('../../db/services/accountService');

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
            const newAccount = { id: 1, name: 'John Doe' };
            accountService.createAccount.mockResolvedValue(newAccount);

            await addNewAccount(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(newAccount);
        });

        it('should return 500 and an error message when accountService.createAccount throws an error', async () => {
            accountService.createAccount.mockRejectedValue(new Error('Failed to create account'));

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
    });

});
