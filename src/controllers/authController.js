const {
  login,
  forgotPassword,
  resetPassword,
} = require("../services/authService");
const loginValidation = require("../validations/authValidation");

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
  try {
    const { email } = req.body;
    const response = await forgotPassword(email);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
// Reset Password
const resetPasswordUser = async (req, res, next) => {
  try {
    const { token } = req.query;
    const { newPassword } = req.body;
    const response = await resetPassword(token, newPassword);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = { loginUser, forgotPasswordUser, resetPasswordUser };
