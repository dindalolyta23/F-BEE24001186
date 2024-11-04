const { createUser, getUsers, getUserById } = require('../services/userService');
const userValidation = require('../validations/userValidation');

const createNewUser = async (req, res) => {
  try {
    const { error } = userValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    } 
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await getUserById(req.params.userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uploadImage = async (req, res) => {
  try {
    const user = await getUserById(req.params.userId);
    if (user) {
      user.image = req.file.path;
      await user.save();
      res.status(200).json({ message: 'Image uploaded successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createNewUser, getAllUsers, getUserDetails, uploadImage};
