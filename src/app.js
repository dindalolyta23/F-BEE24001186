// require("./instrument.js");
// Sentry.setupExpressErrorHandler(app);
// const Sentry = require("@sentry/node");
// const express = require('express');
// const app = express();
// const swaggerUi =require('swagger-ui-express')
// const {verifyToken} = require('./middleware/auth')
// const swaggerDocument = require('./docs/swagger.json');
// const errorHandler = require('./middleware/errorHandler');
// const path = require("path");


// // View Engine
// app.set("views", path.join(path.resolve(), "/src/views"));
// app.set("view engine", "ejs");

// app.use(express.json()); // Middleware untuk mem-parsing JSON
// app.use(express.urlencoded({ extended: true })); // Middleware untuk mem-parsing URL-encoded

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.use('/api/v1/auth', require('./routes/authRoute'));

// app.use(verifyToken);
// app.use('/api/v1/users', require('./routes/userRoute'));
// app.use('/api/v1/accounts', require('./routes/accountRoute'));
// app.use('/api/v1/transactions', require('./routes/transactionRoute'));

// app.get("/reset-password", (req, res) => {
//     const token = req.query.token;
//     if (!token) {
//       return res.status(400).send("Invalid or missing token.");
//     }
//     res.render("resetPassword", { token });
//   });

// app.use(errorHandler);

// app.use((req, res, next) => {
//     res.status(404).send({ message: 'Resource not found' });
// });

// app.get("/", function rootHandler(req, res) {
//   res.end("Hello world!");
// });

// // The error handler must be registered before any other error middleware and after all controllers
// Sentry.setupExpressErrorHandler(app);

// // Optional fallthrough error handler
// app.use(function onError(err, req, res, next) {
//   // The error id is attached to `res.sentry` to be returned
//   // and optionally displayed to the user for support.
//   res.statusCode = 500;
//   res.end(res.sentry + "\n");
// });

// app.listen(3000);
// app.get("/debug-sentry", function mainHandler(req, res) {
//   throw new Error("My first Sentry error!");
// });

// module.exports = app;

// require("./instrument.js");
// const Sentry = require("@sentry/node");
// const { nodeProfilingIntegration } = require("@sentry/profiling-node");
// const express = require("express");
// const swaggerUi = require("swagger-ui-express");
// const { verifyToken } = require("./middleware/auth");
// const errorHandler = require("./middleware/errorHandler");
// const swaggerDocument = require("./docs/swagger.json");
// const path = require("path");

// const app = express();

// // Inisialisasi Sentry
// Sentry.init({
//   dsn: "https://40623254ed96c18945eb23291ac05cb4@o4508319582453760.ingest.us.sentry.io/4508319590055936",
//   integrations: [nodeProfilingIntegration()],
//   tracesSampleRate: 1.0,
//   environment: process.env.NODE_ENV || "development",
// });

// // Middleware untuk menangani request dengan Sentry
// app.use(Sentry.Handlers.requestHandler());
// app.use(Sentry.Handlers.tracingHandler()); // Untuk tracing transaksi

// // View Engine
// app.set("views", path.join(path.resolve(), "/src/views"));
// app.set("view engine", "ejs");

// app.use(express.json()); // Middleware untuk mem-parsing JSON
// app.use(express.urlencoded({ extended: true })); // Middleware untuk mem-parsing URL-encoded

// // Dokumentasi API dengan Swagger
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// // Route API
// app.use("/api/v1/auth", require("./routes/authRoute"));

// app.use(verifyToken);
// app.use("/api/v1/users", require("./routes/userRoute"));
// app.use("/api/v1/accounts", require("./routes/accountRoute"));
// app.use("/api/v1/transactions", require("./routes/transactionRoute"));

// // Halaman Reset Password
// app.get("/reset-password", (req, res) => {
//   const token = req.query.token;
//   if (!token) {
//     return res.status(400).send("Invalid or missing token.");
//   }
//   res.render("resetPassword", { token });
// });

// // Route untuk halaman utama
// app.get("/", function rootHandler(req, res) {
//   res.end("Hello world!");
// });

// // Simulasi error untuk debugging Sentry
// app.get("/debug-sentry", function mainHandler(req, res) {
//   throw new Error("My first Sentry error!");
// });

// // Middleware untuk menangani error dengan Sentry
// app.use(Sentry.Handlers.errorHandler());

// // Middleware fallback untuk resource yang tidak ditemukan
// app.use((req, res, next) => {
//   res.status(404).send({ message: "Resource not found" });
// });

// // Middleware untuk menangani error lainnya
// app.use(errorHandler);
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).send("Internal Server Error");
// });

// // Menjalankan server
// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

// module.exports = app;
require("../instrument.js");
const Sentry = require("@sentry/node");
const { nodeProfilingIntegration } = require("@sentry/profiling-node");
const express = require("express");
const { Server } = require('socket.io');
const swaggerUi = require("swagger-ui-express");
const { verifyToken } = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler");
const swaggerDocument = require("./docs/swagger.json");
const path = require("path");

const app = express();
const io = new Server(server);

export { io }

// EJS View Engine
app.set("views", path.join("./src/views"));
app.set('view engine', 'ejs');
app.use(expressEjsLayouts);


// View Engine
app.set("views", path.join(path.resolve(), "/src/views"));
app.set("view engine", "ejs");

app.use(express.json()); // Middleware untuk mem-parsing JSON
app.use(express.urlencoded({ extended: true })); // Middleware untuk mem-parsing URL-encoded

// Dokumentasi API dengan Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware untuk memaksa error 500 jika diakses melalui Postman
app.use((req, res, next) => {
  if (req.headers['user-agent'] && req.headers['user-agent'].includes('Postman')) {
    return next(new Error("Forced Internal Server Error for Postman"));
  }
  next();
});

// Route API
app.use("/api/v1/auth", require("./routes/authRoute"));

app.use(verifyToken);
app.use("/api/v1/users", require("./routes/userRoute"));
app.use("/api/v1/accounts", require("./routes/accountRoute"));
app.use("/api/v1/transactions", require("./routes/transactionRoute"));

// Halaman Reset Password
app.get("/reset-password", (req, res) => {
  const token = req.query.token;
  if (!token) {
    return res.status(400).send("Invalid or missing token.");
  }
  res.render("resetPassword", { token });
});

// Route untuk halaman utama
app.get("/", function rootHandler(req, res) {
  res.end("Hello world!");
});

// Simulasi error untuk debugging Sentry
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// Rute untuk memaksa error 500
app.post("/simulate-500", (req, res, next) => {
  next(new Error("Simulated 500 Error"));
});

Sentry.setupExpressErrorHandler(app);

// Middleware fallback untuk resource yang tidak ditemukan
app.use((req, res, next) => {
  res.status(404).send({ message: "Resource not found" });
});

// Middleware untuk menangani error lainnya
app.use((err, req, res, next) => {
  if (req.headers['user-agent'] && req.headers['user-agent'].includes('Postman')) {
    console.error("Postman triggered error:", err.message);
    return res.status(500).send({ message: "Internal Server Error from Postman" });
  }
  console.error(err);
  res.status(500).send("Internal Server Error");
});

// Menjalankan server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
