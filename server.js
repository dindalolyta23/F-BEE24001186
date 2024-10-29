const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();
const {getAllAccounts,getAccountById} = require('./src/controllers/accountController');
const {connectDB} = require('./src/db/index');
const {transferMoney, getAllTransactions, getTransactionDetails} = require('./src/controllers/transactionController');
const { createNewUser, getAllUsers, getUserDetails, loginUser } = require('./src/controllers/userController');
const swaggerUi =require('swagger-ui-express')
const {verifyToken} = require('./auth')
// const {swaggerSpec} = require('./src/swaggerOption')

app.use(express.json()); // Middleware untuk mem-parsing JSON
app.use(express.urlencoded({ extended: true })); // Middleware untuk mem-parsing URL-encoded
// app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Endpoint untuk membuat akun baru
app.post('/api/v1/accounts', async (req, res) => {
    try {
        const { userId, accountType, balance } = req.body;
        const newAccount = await prisma.bank_account.create({
            data: {
                user_id: userId,
                bank_name: "Default Bank", // Misalkan Anda ingin mengisi dengan nama bank default
                bank_account_number: "123456789", // Misalkan Anda ingin mengisi dengan nomor rekening default
                balance: balance,
            },
        });
        res.status(201).json(newAccount); // Mengirim respons dengan status 201 Created
    } catch (error) {
        console.error("Error creating account:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/api/v1/accounts', async (req,res) => {
   try {
       const accounts = await prisma.bank_account.findMany();
         res.status(200).json(accounts);   
   }catch(err){
         console.error("Error getting accounts:", err);
         res.status(500).json({error: "Internal server error"});
   }
});

app.get('/api/v1/accounts/:id', async (req,res) => {
    try{
        
        const account = await prisma.bank_account.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
            
        }); 
        if(!account){
            res.status(404).json({error: "Account not found"});
        }
        res.status(200).json(account);
    }catch(err){
        console.error("Error getting account:", err);
        res.status(500).json({error: err.message});
    }
});
// Endpoint Untuk Transaksi
app.post('/api/v1/transactions', verifyToken, transferMoney)
app.get('/api/v1/transactions', verifyToken, getAllTransactions)
app.get('/api/v1/transactions/:transactionId', verifyToken, getTransactionDetails)

// * Endpoint untuk membuat User Baru
app.get('/api/v1/users', getAllUsers)
app.post('/api/v1/users', createNewUser)
app.get('/api/v1/users/:userId', verifyToken, getUserDetails)
app.post('/api/v1/users/login/', loginUser)

// Memulai server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});