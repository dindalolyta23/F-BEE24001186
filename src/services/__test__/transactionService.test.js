const { createTransaction, getTransactions, getTransactionById } = require("../transactionService");
const { prisma } = require('../../configs/database');

jest.mock("../../configs/database", () => ({
    prisma: {
        transaction: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
        },
    },
}));

describe("transactionService", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    describe("Testing function create transaction", () => {
        it("should success create a new transaction", async () => {
            const insertData = {
                amount: 100000,
                sourceAccountId: 1,
                destinationAccountId: 2
            };

            const mockData = {
                id: 1,
                amount: 100000,
                source_account_id: 1,
                destination_account_id: 2,
            };

            prisma.transaction.create.mockResolvedValue(mockData);

            const result = await createTransaction(insertData);

            expect(prisma.transaction.create).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockData);
            expect(prisma.transaction.create).toHaveBeenCalledWith({
                data: {
                    amount: insertData.amount,
                    source_account_id: insertData.sourceAccountId,
                    destination_account_id: insertData.destinationAccountId,
                },
            });
        });
    });

    describe("Testing function get all transactions", () => {
        it("should get all transactions", async () => {
            const mockData = [
                {
                    id: 1,
                    amount: 100000,
                    source_account_id: 1,
                    destination_account_id: 2,
                    createdAt: "2024-10-29T00:00:00.000Z",
                    updatedAt: null,
                    deletedAt: null
                },
                {
                    id: 2,
                    amount: 200000,
                    source_account_id: 2,
                    destination_account_id: 3,
                    createdAt: "2024-10-29T00:00:00.000Z",
                    updatedAt: null,
                    deletedAt: null
                }
            ];

            prisma.transaction.findMany.mockResolvedValue(mockData);

            const result = await getTransactions();

            expect(prisma.transaction.findMany).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockData);
        });
    });

    describe("Testing function get transaction by id", () => {
        it("should get transaction by id", async () => {
            const mockData = {
                id: 1,
                amount: 100000,
                source_account_id: 1,
                destination_account_id: 2,
                createdAt: "2024-10-29T00:00:00.000Z",
                updatedAt: null,
                deletedAt: null
            };

            const transactionId = 1;

            prisma.transaction.findUnique.mockResolvedValue(mockData);

            const result = await getTransactionById(transactionId);

            expect(prisma.transaction.findUnique).toHaveBeenCalledTimes(1);
            expect(prisma.transaction.findUnique).toHaveBeenCalledWith({
                where: { id: transactionId },
            });

            expect(result).toEqual(mockData);
        });
    });
});
