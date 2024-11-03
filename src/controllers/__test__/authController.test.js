const { login } = require('../../services/authService');
const { loginUser } = require('../authController');
const jwt = require('jsonwebtoken');

jest.mock('../../services/authService');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
    let req;
    let res;

    beforeEach(() => {
        jest.clearAllMocks();
        req = {};
        res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
    });

    describe('loginUser', () => {
        it('should return 200 and a token', async () => {
            req.body = {
                email: "dinda@mail.com",
                password: 'password'
            };

            login.mockResolvedValue({ token: 'token' });

            jwt.sign.mockReturnValue('token');

            await loginUser(req, res);

            expect(login).toHaveBeenCalledTimes(1);

            expect(login).toHaveBeenCalledWith(req.body);

            expect(res.status).toHaveBeenCalledWith(200);

            expect(res.json).toHaveBeenCalledWith({token: 'token'});

        });

        it('should return 400 when validation error', async () => {
            req.body = {
                email: "dinda@mail.com"
            };

            await loginUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "\"password\" is required" });

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
