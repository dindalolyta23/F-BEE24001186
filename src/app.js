// require('dotenv').config();
// const express = require('express');
// const swaggerUi = require('swagger-ui-express');
// const app = express();
// const { verifyToken } = require('./middleware/auth');
// const swaggerDocument = require('./docs/swagger.json');
// const errorHandler = require('./middleware/errorHandler');
// const mediaRouter = require('./routes/media.route');


// // Tanpa '../src'

// // Middleware untuk parsing JSON dan URL-encoded
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Swagger setup
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// // Routes untuk otentikasi
// app.use('/api/v1/auth', require('./routes/authRoute'));

// // Middleware otentikasi
// // app.use(verifyToken);

// // Rute API lainnya
// app.use('/api/v1/users', require('./routes/userRoute'));
// app.use('/api/v1/accounts', require('./routes/accountRoute'));
// app.use('/api/v1/transactions', require('./routes/transactionRoute'));

// // Menangani file statis
// app.use('/images', express.static('public/images'));
// app.use('/files', express.static('public/files'));

// // Rute untuk upload media
// app.use('/api/v1', mediaRouter);

// // Penanganan error
// app.use(errorHandler);
// app.use((req, res, next) => {
//     res.status(404).send({ message: 'Resource not found' });
// });

// // Server port
// const PORT = process.env.PORT || 3000;
// if (require.main === module) {
//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
// }

// module.exports = app;
require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const app = express();
const { verifyToken } = require('./middleware/auth');
const swaggerDocument = require('./docs/swagger.json');
const errorHandler = require('./middleware/errorHandler');
const mediaRouter = require('./routes/media.route');

// Pastikan direktori 'public/images' dan 'public/files' ada
const imagesDir = path.join(__dirname, 'public/images');
const filesDir = path.join(__dirname, 'public/files');

if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir, { recursive: true });
}

// Middleware untuk parsing JSON dan URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes untuk otentikasi
app.use('/api/v1/auth', require('./routes/authRoute'));

// Middleware otentikasi
// app.use(verifyToken);

// Rute API lainnya
app.use('/api/v1/users', require('./routes/userRoute'));
app.use('/api/v1/accounts', require('./routes/accountRoute'));
app.use('/api/v1/transactions', require('./routes/transactionRoute'));

// Menangani file statis
app.use('/images', express.static('public/images'));
app.use('/files', express.static('public/files'));

// Rute untuk upload media
app.use('/api/v1', mediaRouter);

// Penanganan error
app.use(errorHandler);
app.use((req, res, next) => {
    res.status(404).send({ message: 'Reso urce not found' });
});

// Server port
const PORT = process.env.PORT || 3000;
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
