require("../instrument.js");
const Sentry = require("@sentry/node");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const { verifyToken } = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler");
const swaggerDocument = require("./docs/swagger.json");
const path = require("path");
const { getIoInstance } = require("./configs/socket");

const app = express();

// EJS View Engine
app.set("views", path.join("./src/views"));
app.set('view engine', 'ejs');

app.use(express.json()); // Middleware untuk mem-parsing JSON
app.use(express.urlencoded({ extended: true })); // Middleware untuk mem-parsing URL-encoded

// Dokumentasi API dengan Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Halaman Reset Password
app.get("/reset-password", (req, res) => {
  res.render("resetPassword", { token });
});

// Halaman Notification
app.get("/notification", (req, res) => {
  res.render("notification");
});

// Route untuk halaman utama
app.get("/", async function rootHandler(req, res) {
  const io = await getIoInstance();
  setTimeout(() => {
    io.emit("message", "Hallo Binarian");
  }, 1000);

  res.render('index');
});

// Route API
app.use("/api/v1/auth", require("./routes/authRoute"));

app.use(verifyToken);
app.use("/api/v1/users", require("./routes/userRoute"));
app.use("/api/v1/accounts", require("./routes/accountRoute"));
app.use("/api/v1/transactions", require("./routes/transactionRoute"));


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
  // if (req.headers['user-agent'] && req.headers['user-agent'].includes('Postman')) {
  //   console.error("Postman triggered error:", err.message);
  //   return res.status(500).send({ message: "Internal Server Error from Postman" });
  // }
  console.error(err);
  res.status(500).send("Internal Server Error");
});

module.exports = app;
