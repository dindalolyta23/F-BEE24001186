const { createUser, getUsers, getUserById, login } = require("../userService");
const { prisma } = require('../../index');
const jwt = require('jsonwebtoken')

jest.mock("../../index", () => ({
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

describe("userService", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    describe("Testing function create user", () => {
        it("should success create a new user", async () => {
            const mockData = {
                "id": 1,
                "name": "fulan",
                "email": "fulan@gmail.com",
                "password": "password",
                "createdAt": "2024-10-29T00:00:00.000Z",
                "updatedAt": "2024-10-29T00:00:00.000Z",
                "deletedAt": null
            }
    
            const insertData = {
                name: "John Doe",
                email: "jane.doe@example.com",
                password: "password123"
            };
    
            prisma.user.create.mockResolvedValue(mockData);
    
            const result = await createUser(insertData);
    
            expect(prisma.user.create).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockData);
    
            expect(prisma.user.create).toHaveBeenCalledWith({
                data: insertData,
            });
    
        })
    })

    describe("Testing function get all user", () => {
        it("should get all users", async () => {
            const mockData = [
                {
                    "id": 1,
                    "name": "fulan",
                    "email": "fulan@mail.com",
                    "password": "password",
                    "createdAt": "2024-10-29T00:00:00.000Z",
                    "updatedAt": "2024-10-29T00:00:00.000Z",
                    "deletedAt": null
                },
                {
                    "id": 2,
                    "name": "fulan2",
                    "email": "fulan2@mail.com",
                    "password": "password",
                    "createdAt": "2024-10-29T00:00:00.000Z",
                    "updatedAt": "2024-10-29T00:00:00.000Z",
                    "deletedAt": null
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
                "name": "fulan",
                "email": "fulan@mail.com",
                "password": "password",
                "createdAt": "2024-10-29T00:00:00.000Z",
                "updatedAt": "2024-10-29T00:00:00.000Z",
                "deletedAt": null
            };
    
            const userId = 1;
    
            prisma.user.findUnique.mockResolvedValue(mockData);
    
            const result = await getUserById(userId);
    
            expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
            expect(prisma.user.findUnique).toHaveBeenCalledWith({
                where: { id: userId },
            });
    
            expect(result).toEqual(mockData);
    
        });
    })

    describe("Testing function Login", ()=>{
        it("should success login", async () => {
            const mockData = {
                "id": 1,
                "name": "fulan",
                "email": "fulan@mail.com",
                "password": "password",
                "createdAt": "2024-10-29T00:00:00.000Z",
                "updatedAt": "2024-10-29T00:00:00.000Z",
                "deletedAt": null
            };
    
            const loginData = {
                id: 1,
                password: "password"
            };
    
            const token = jwt.sign(
                { userId: mockData.id, email: mockData.email },
                'secret key',
                { expiresIn: "1h" }
            );
    
            prisma.user.findUnique.mockResolvedValue(mockData);
    
            const result = await login(loginData);
    
            expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
    
            expect(result).toEqual({ token, user: mockData });
    
        });
    })
});