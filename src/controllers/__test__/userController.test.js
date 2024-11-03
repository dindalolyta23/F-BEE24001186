const { name } = require('ejs');
const { createUser, getUsers, getUserById, login } = require('../../services/userService');
const { createNewUser, getAllUsers, getUserDetails, loginUser } = require('../userController');

jest.mock('../../services/userService');

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
                password: 'password',
                identityType: 'NATIONAL_ID',
                identityNumber: '1234567890',
                address: 'Jakarta',
            };

            const mockResponse = {
                "id": 1,
                "name": "dinda",
                "email": "dinda@mail.com",
                "createdAt": "2024-11-02T17:32:43.625Z",
                "updatedAt": null,
                "deletedAt": null,
                "Profile": [
                    {
                        "id": 1,
                        "user_id": 1,
                        "identity_type": "ktp",
                        "identity_number": "1234567890123457",
                        "address": "Jl. Melati"
                    }
                ]
            }

            createUser.mockResolvedValue(mockResponse);

            req.body = newUser;

            await createNewUser(req, res);

            expect(res.status).toHaveBeenCalledWith(201);

            expect(res.json).toHaveBeenCalledWith(mockResponse);

        });

        it('should return 400 when validation error', async () => {
            req.body = {
                name    : "dinda",
                email: "dinda@mail.com"
            };

            await createNewUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "\"password\" is required" });

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
                    "id": 1,
                    "name": "dinda",
                    "email": "dinda@mail.com",
                    "createdAt": "2024-11-02T17:32:43.625Z",
                    "updatedAt": null,
                    "deletedAt": null,
                    "Profile": [
                        {
                            "id": 1,
                            "user_id": 1,
                            "identity_type": "ktp",
                            "identity_number": "1234567890123457",
                            "address": "Jl. Melati"
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "dinda2",
                    "email": "dinda2@mail.com",
                    "createdAt": "2024-11-02T17:32:43.625Z",
                    "updatedAt": null,
                    "deletedAt": null,
                    "Profile": [
                        {
                            "id": 2,
                            "user_id": 2,
                            "identity_type": "ktp",
                            "identity_number": "1234567890123458",
                            "address": "Jl. Melati"
                        }
                    ]
                }
            ];

            getUsers.mockResolvedValue(users);

            await getAllUsers(req, res);

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
                "id": 1,
                "name": "dinda",
                "email": "dinda@mail.com",
                "createdAt": "2024-11-02T17:32:43.625Z",
                "updatedAt": null,
                "deletedAt": null,
                "Profile": [
                    {
                        "id": 1,
                        "user_id": 1,
                        "identity_type": "ktp",
                        "identity_number": "1234567890123457",
                        "address": "Jl. Melati"
                    }
                ]
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

});
