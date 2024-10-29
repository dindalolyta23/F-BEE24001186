const { createUser, getUsers, getUserById, login } = require('../../db/services/userService');
const { createNewUser, getAllUsers, getUserDetails, loginUser } = require('../userController');

jest.mock('../../db/services/userService');

describe('userController', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
    });

    describe('createNewUser', () => {
        it('should return 201 and a new user', async () => {
            const newUser = {
                name: 'John Doe',
                email: 'john@mail.com',
                password: 'password'
            };

            createUser.mockResolvedValue(newUser);

            req.body = newUser;

            await createNewUser(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(newUser);

        });

        it('should return 500 when error', async () => {
            const error = new Error('Internal server error');

            createUser.mockRejectedValue(error);

            await createNewUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: error.message });
        });

    });

    describe('getAllUsers', () => {
        it('should return 200 and all users', async () => {
            const users = [
                {
                    name: 'John Doe',
                    email: 'john@mail.com',
                    password: 'password'
                },
                {
                    name: 'Jane Doe',
                    email: 'jane@mail.com',
                    password: 'password'
                }
            ];

            getUsers.mockResolvedValue(users);

            await getAllUsers(req, res);

            expect(getUsers).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(users);

        });

        it('should return 500 when error', async () => {
            const error = new Error('Internal server error');

            getUsers.mockRejectedValue(error);

            await getAllUsers(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: error.message });
        });
        
    });

    describe('getUserDetails', () => {
        it('should return 200 and a user', async () => {
            const user = {
                name: 'John Doe',
                email: 'john@mail.com',
                password: 'password'
            };

            getUserById.mockResolvedValue(user);

            req.params = { userId: 1 };

            await getUserDetails(req, res);

            expect(getUserById).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(user);

        });

        it('should return 404 when user not found', async () => {
            getUserById.mockResolvedValue(null);

            req.params = { userId: 1 };

            await getUserDetails(req, res);

            expect(getUserById).toHaveBeenCalledTimes(2);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
        });

        it('should return 500 when error', async () => {
            const error = new Error('Internal server error');

            getUserById.mockRejectedValue(error);

            req.params = { userId: 1 };

            await getUserDetails(req, res);

            expect(getUserById).toHaveBeenCalledTimes(3);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: error.message });
        });

    });

    describe('loginUser', () => {
        it('should return 201 and a token', async () => {
            const mockUser = {
                "id": 1,
                "name": "fulan",
                "email": "fulan@mail.com",
                "password": "password",
                "createdAt": "2024-10-29T00:00:00.000Z",
                "updatedAt": "2024-10-29T00:00:00.000Z",
                "deletedAt": null
            };
    
            login.mockResolvedValue({ token: 'token' , user: mockUser});

            req.body = {
                id: 1,
                password: 'password'
            };

            await loginUser(req, res);

            expect(login).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ token: 'token', user: mockUser });

        });

        it('should return 500 when error', async () => {
            const error = new Error('Internal server error');

            login.mockRejectedValue(error);

            await loginUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: error.message });
        });

    });

});
