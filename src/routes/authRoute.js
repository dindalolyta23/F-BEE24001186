const express = require('express');
const { loginUser, forgotPasswordUser, resetPasswordUser } = require('../controllers/authController');

const router = express.Router();

router.post('/login',loginUser);

router.post("/forgot-password", forgotPasswordUser);
router.post("/reset-password", resetPasswordUser);

module.exports = router;
