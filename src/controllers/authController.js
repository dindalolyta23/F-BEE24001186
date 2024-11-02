const { login } = require('../services/authService');
const loginValidation = require('../validations/authValidation');

const loginUser = async (req, res) => {
  try {
    const { error } = loginValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const token = await login(req.body);
    res.status(201).json(token);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {  loginUser };
