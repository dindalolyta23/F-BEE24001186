// const jwt = require( "jsonwebtoken");

// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ error: "No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: "invalid token" });
//   }
// };

// module.exports = {verifyToken} 

// unit test for the auth middleware

const jwt = require("jsonwebtoken");
const { verifyToken } = require("../auth");

jest.mock("jsonwebtoken");

describe("Auth middleware", () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        jest.clearAllMocks();
        req = {
            headers: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    })

    it("should return 401 if no token is provided", () => {
        verifyToken(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: "No token provided" });
    });

    it("should set req.user if token is valid", () => {
        req.headers.authorization = "Bearer validToken";
        jwt.verify = jest.fn().mockReturnValue({ id: 1, name: "test" });
        verifyToken(req, res, next);
        expect(req.user).toEqual({ id: 1, name: "test" });
        expect(next).toHaveBeenCalled();
    });

    it("should return 401 if jwt throws an error", () => {
        req.headers.authorization = "Bearer validToken";
        jwt.verify.mockImplementation(() => {
            throw new Error();
        });

        verifyToken(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401); 
        expect(res.json).toHaveBeenCalledWith({ error: "invalid token" });

    });

});