const {
  login,
  forgotPassword,
  resetPassword,
} = require("../services/authService");
const loginValidation = require("../validations/authValidation");
const { getIoInstance } = require("../configs/socket");

const loginUser = async (req, res) => {
  try {
    const { error } = loginValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const token = await login(req.body);
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Forgot Password
const forgotPasswordUser = async (req, res, next) => {
  const io = await getIoInstance();
  try {
    const { email } = req.body;
    const response = await forgotPassword(email);
    io.emit("message", "Password reset link sent to your email");
    res.status(200).json(response);
  } catch (error) {
    io.emit("message-fail", "Failed to send password reset link to your email");
    console.log(error.message)
    res.status(500).json(error.message);
  }
};
// Reset Password
const resetPasswordUser = async (req, res, next) => {
  const io = await getIoInstance();
  try {
    const { token } = req.query;
    const { newPassword } = req.body;
    const response = await resetPassword(token, newPassword);
    io.emit("message", "Password reset successfully");
    res.status(200).json(response);
  } catch (error) {
    io.emit("message-fail", "Failed to reset password");
    console.log(error.message)
    res.status(500).json(error.message);
  }
};

module.exports = { loginUser, forgotPasswordUser, resetPasswordUser };
