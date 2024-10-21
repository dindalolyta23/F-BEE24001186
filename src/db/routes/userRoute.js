const express = require('express');
const { createNewUser, getAllUsers, getUserDetails } = require('../controllers/userController');

const router = express.Router();

router.post('/users', createNewUser);
router.get('/users', getAllUsers);
router.get('/users/:userId', getUserDetails);


module.exports = router;
