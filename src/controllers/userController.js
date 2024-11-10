const { createUser, getUsers, getUserById, updateImageProfile } = require('../services/userService');
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

const uploadImageProfile = async (req, res) => {
  try {
    if(!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }
    const user = await updateImageProfile(req.user.userId, req.file);
    res.status(200).json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createNewUser, getAllUsers, getUserDetails, uploadImageProfile};
