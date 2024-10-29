const { createUser, getUsers, getUserById, login } = require("../userService");
const {prisma} = require('../../index');
const jwt = require('jsonwebtoken')

// const {prisma} = require('../index');
// const jwt = require('jsonwebtoken')

// const createUser = async (data) => {
//   return await prisma.user.create({
//     data: {
//       name: data.name,
//       email: data.email,
//       password: data.password,
//     },
//   });
// };

// const getUsers = async () => {
//   return await prisma.user.findMany()
// };

// const getUserById = async (userId) => {
//   return await prisma.user.findUnique({
//     where: { id: parseInt(userId) },
//   });
// };

// const login = async (data) => {
//   const { id, password } = data;

//   const user = await prisma.user.findUnique({
//     where: { id },
//   });

//   if (!user || password !== user.password) {
//     throw new AppError("Invalid email or password", 401);
//   }

//   const token = jwt.sign(
//     { userId: user.id, email: user.email },
//     process.env.JWT_SECRET,
//     { expiresIn: "1h" }
//   );

//   return { token, user };
// }


// module.exports = { createUser, getUsers, getUserById, login };

// unit testing for userservice

jest.mock("../../index", () => ({
    prisma: {
        user: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
        },
    },
}));

describe("userService", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it("should create a new user", async () => {

        const mockData = {
           data : {
            id: 1,
            name: "John Doe",
            email: "jane.doe@example.com",
            password: "password123",
            updatedAt: "2022-10-10",
           },
            createdAt: "2022-10-19",
            deletedAt: null,  
        };
        
        const data = {
            name: "John Doe",   
            email: "jane.doe@example.com",
            password: "password123"
        };

        // const createUserMock = jest.spyOn(prisma.user, "create");

        prisma.user.create.mockResolvedValue(mockData);


        const result = await createUser(data); 

        expect(prisma.user.create).toHaveBeenCalledWith(
             mockData
        );


    })

});
