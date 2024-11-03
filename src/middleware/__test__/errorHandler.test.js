const errorHandler = require('../errorHandler');

describe('errorHandler middleware', () => {
    it('should send a 500 status code and the error message', () => {
        const err = new Error('Something went wrong');
        const req = {};
        const res = {
            status: jest.fn(() => res),
            send: jest.fn(),
        };
        const next = jest.fn();

        errorHandler(err, req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({ message: err.message });
    });
});