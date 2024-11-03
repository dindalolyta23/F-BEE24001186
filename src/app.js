const express = require('express');
const app = express();
const swaggerUi =require('swagger-ui-express')
const {verifyToken} = require('./middleware/auth')
const swaggerDocument = require('./docs/swagger.json');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json()); // Middleware untuk mem-parsing JSON
app.use(express.urlencoded({ extended: true })); // Middleware untuk mem-parsing URL-encoded

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1/auth', require('./routes/authRoute'));

app.use(verifyToken);
app.use('/api/v1/users', require('./routes/userRoute'));
app.use('/api/v1/accounts', require('./routes/accountRoute'));
app.use('/api/v1/transactions', require('./routes/transactionRoute'));

app.use(errorHandler);

app.use((req, res, next) => {
    res.status(404).send({ message: 'Resource not found' });
});

module.exports = app;