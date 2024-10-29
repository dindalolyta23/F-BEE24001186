// const { prisma } = require('../../index');
// const { createAccount, getAccounts, getAccountDetails } = require("../accountService");

// jest.mock("../../index", () => ({
//     prisma: {
//         bank_account: {
//             create: jest.fn(),
//             findMany: jest.fn(),
//             findUnique: jest.fn(),
//         },
//     }
// }))


// describe("accountService", () => {
//     beforeEach(() => {
//         jest.resetAllMocks();
//         jest.restoreAllMocks();
//     });

//     describe("create account testing", () => {
//         it("should return success create account", async () => {
//             const insertData = {
//                 balance: 15000000,
//                 userId: 1
//             };

//             const mockData = 
//             {
//                 "id": 6,
//                 "user_id": 1,
//                 "bank_name": "Default Bank",
//                 "bank_account_number": "123456789",
//                 "balance": "15000000",
//                 "createdAt": "2024-10-29T09:27:20.527Z",
//                 "updatedAt": null,
//                 "deletedAt": null
//             }
            
//             prisma.bank_account.create.mockResolvedValue(mockData);
            
//             const result = await createAccount(insertData);

//             expect(prisma.bank_account.create).toHaveBeenCalledTimes(1);
//             expect(result).toEqual(mockData);

//             expect(prisma.bank_account.create).toHaveBeenCalledWith({
//                 data: insertData,
//             });
            
//         })
//     })

    
//     describe("getAccounts", () => {
//         it("should return success getAccount", async () => {
            
            
//         })
//     })
    
//     describe()

// });


const { prisma } = require('../../index');
const { createAccount, getAccounts, getAccountDetails } = require("../accountService");

jest.mock("../../index", () => ({
    prisma: {
        bank_account: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
        },
    }
}))

describe("accountService", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    describe("create account testing", () => {
        it("should return success create account", async () => {
            const insertData = {
                balance: 15000000,
                userId: 1
            };

            const mockData = {
                id: 6,
                user_id: 1,
                bank_name: "Default Bank",
                bank_account_number: "123456789",
                balance: "15000000",
                createdAt: "2024-10-29T09:27:20.527Z",
                updatedAt: null,
                deletedAt: null
            };
            
            prisma.bank_account.create.mockResolvedValue(mockData);
            
            const result = await createAccount(insertData);

            expect(prisma.bank_account.create).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockData);
            expect(prisma.bank_account.create).toHaveBeenCalledWith({
                data: insertData,
            });
        });
    });

    describe("getAccounts", () => {
        it("should return success getAccount", async () => {
            const mockData = [
                {
                    id: 1,
                    user_id: 1,
                    bank_name: "Default Bank",
                    bank_account_number: "123456789",
                    balance: "15000000",
                    createdAt: "2024-10-29T09:27:20.527Z",
                    updatedAt: null,
                    deletedAt: null
                },
                {
                    id: 2,
                    user_id: 2,
                    bank_name: "Default Bank",
                    bank_account_number: "987654321",
                    balance: "20000000",
                    createdAt: "2024-10-29T09:27:20.527Z",
                    updatedAt: null,
                    deletedAt: null
                }
            ];

            prisma.bank_account.findMany.mockResolvedValue(mockData);
            const result = await getAccounts();

            expect(prisma.bank_account.findMany).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockData);
        });
    });

    describe("getAccountDetails", () => {
        it("should return success getAccountDetails", async () => {
            const accountId = 1;
            const mockData = {
                id: accountId,
                user_id: 1,
                bank_name: "Default Bank",
                bank_account_number: "123456789",
                balance: "15000000",
                createdAt: "2024-10-29T09:27:20.527Z",
                updatedAt: null,
                deletedAt: null
            };

            prisma.bank_account.findUnique.mockResolvedValue(mockData);
            const result = await getAccountDetails(accountId);

            expect(prisma.bank_account.findUnique).toHaveBeenCalledTimes(1);
            expect(prisma.bank_account.findUnique).toHaveBeenCalledWith({
                where: { id: accountId },
            });
            expect(result).toEqual(mockData);
        });
    });
});
