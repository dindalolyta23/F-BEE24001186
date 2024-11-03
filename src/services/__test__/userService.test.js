const { createUser, getUsers, getUserById, login } = require("../userService");
const { prisma } = require('../../configs/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

jest.mock("../../configs/database", () => ({
    prisma: {
        user: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
        },
    },
}));

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));

jest.mock('bcrypt', () => ({
    hash: jest.fn(),
}));

describe("userService", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    describe("Testing function create user", () => {
        it("should success create a new user", async () => {
            const mockData = {
                "id": 1,
                "name": "dinda",
                "email": "dinda@gmail.com",
                "createdAt": "2024-10-29T00:00:00.000Z",
                "updatedAt": "2024-10-29T00:00:00.000Z",
                "deletedAt": null,
                "Profile": {
                    "id": 1,
                    "identity_type": "KTP",
                    "identity_number": "1234567890",
                    "address": "Jl. Raya",
                }
            }
    
            const insertData = {
                name: "John Doe",
                email: "jane.doe@example.com",
                password: "password123",
                identityType: "KTP",
                identityNumber: "1234567890",
                address: "Jl. Raya"
            };
    
            const hashPassword = "hashedPassword";

            bcrypt.hash.mockResolvedValue(hashPassword);

            prisma.user.create.mockResolvedValue(mockData);

            const result = await createUser(insertData);

            expect(bcrypt.hash).toHaveBeenCalledTimes(1);

            expect(prisma.user.create).toHaveBeenCalledTimes(1);

            expect(prisma.user.create).toHaveBeenCalledWith({
                data: {
                    name: insertData.name,
                    email: insertData.email,
                    password: hashPassword,
                    Profile: {
                        create: {
                            identity_type: insertData.identityType,
                            identity_number: insertData.identityNumber,
                            address: insertData.address
                        }
                    }
                },
                include: {
                    Profile: true
                }
            });

            expect(result).toEqual(mockData);
    
        })
    })

    describe("Testing function get all user", () => {
        it("should get all users", async () => {
            const mockData = [
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

            prisma.user.findMany.mockResolvedValue(mockData);

            const result = await getUsers();

            expect(prisma.user.findMany).toHaveBeenCalledTimes(1);

            expect(result).toEqual(mockData);
    
        });
    })

    describe("Testing function Get One User", () => {
        it("should get user by id", async () => {
            const mockData = {
                "id": 1,
                "name": "dinda",
                "email": "dinda@gmail.com",
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
    
            const userId = 1;
    
            prisma.user.findUnique.mockResolvedValue(mockData);
    
            const result = await getUserById(userId);
    
            expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
            expect(prisma.user.findUnique).toHaveBeenCalledWith({
                where: {
                    id: userId
                },
                include: {
                    Profile: true
                }
            });
    
            expect(result).toEqual(mockData);
    
        });

        it("should return null when user not found", async () => {
            const userId = 1;
    
            prisma.user.findUnique.mockResolvedValue(null);
    
            const result = await getUserById(userId);
    
            expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
            expect(prisma.user.findUnique).toHaveBeenCalledWith({
                where: {
                    id: userId
                },
                include: {
                    Profile: true
                }
            });
    
            expect(result).toBeNull();
    
        });

    })

});