const { createUser, getUsers, getUserById,updateUser,deleteUser, login } = require('../db/services/userService');

const createNewUser = async (req, res) => {
  try {
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

const updateUserById = async (req,res) => {
  try{
    const {id} = req.params
    const user = await updateUser(id,req.body)
    if(user){
      res.status(200).json({
        message: "User updated succesfully",
        data: user
      })
    }
  }catch(err){
    res.status(500).json({message: err.message});
  }
}

const loginUser = async (req, res) => {
  try {
    const token = await login(req.body);
    res.status(201).json(token);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createNewUser, getAllUsers, getUserDetails,updateUserById, loginUser };
