const { login } = require("../authService");
const { prisma } = require('../../configs/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

jest.mock("../../configs/database", () => ({
    prisma: {
        user: {
            findUnique: jest.fn(),
        },
    },
}));

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));

jest.mock('bcrypt', () => ({
    compare: jest.fn(),
}));

describe("userService", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    describe("Testing function Login", () => {
        it("should success login", async () => {
            const mockData = {
                "id": 1,
                "name": "dinda",
                "email": "dinda@mail.com",
                "createdAt": "2024-10-29T00:00:00.000Z",
                "updatedAt": "2024-10-29T00:00:00.000Z",
                "deletedAt": null,
                "Profile": {
                    "id": 1,
                    "identity_type": "KTP",
                    "identity_number": "1234567890",
                    "address": "Jl. Raya",
                }
            };

            const loginData = {
                email: "dinda@mail.com",
                password: "password"
            };

            prisma.user.findUnique.mockResolvedValue(mockData);
            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue("token");

            const result = await login(loginData);

            expect(result).toStrictEqual({ token: "token" });

            expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);

            expect(bcrypt.compare).toHaveBeenCalledTimes(1);

            expect(jwt.sign).toHaveBeenCalledTimes(1);

            expect(prisma.user.findUnique).toHaveBeenCalledWith({
                where: {
                    email: "dinda@mail.com",
                },
            });

            expect(jwt.sign).toHaveBeenCalledWith(
                {
                    userId: 1,
                    email: "dinda@mail.com"
                },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
        });

        it("should throw error when user not found", async () => {
            const loginData = {
                email: "dinda@mail.com",
                password: "password"
            };

            prisma.user.findUnique.mockResolvedValue(null);

            try {
                await login(loginData);
            } catch (error) {
                expect(error.message).toBe("Invalid email or password");
            }

            expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);

            expect(prisma.user.findUnique).toHaveBeenCalledWith({
                where: {
                    email: "dinda@mail.com",
                },
            });
        });

        it("should throw error when password is invalid", async () => {
            const mockData = {
                "id": 1,
                "name": "dinda",
                "email": "dinda@mail.com",
                "createdAt": "2024-10-29T00:00:00.000Z",
                "updatedAt": "2024-10-29T00:00:00.000Z",
                "deletedAt": null,
                "Profile": {
                    "id": 1,
                    "identity_type": "KTP",
                    "identity_number": "1234567890",
                    "address": "Jl. Raya",
                }
            };

            const loginData = {
                email: "dinda@mail.com",
                password: "password"
            };

            prisma.user.findUnique.mockResolvedValue(mockData);
            bcrypt.compare.mockResolvedValue(false);

            try {
                await login(loginData);
            } catch (error) {
                expect(error.message).toBe("Invalid email or password");
            }

            expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);

            expect(bcrypt.compare).toHaveBeenCalledTimes(1);

            expect(prisma.user.findUnique).toHaveBeenCalledWith({
                where: {
                    email: "dinda@mail.com",
                },
            });
            expect(bcrypt.compare).toHaveBeenCalledWith("password", undefined);

        });
    })
});