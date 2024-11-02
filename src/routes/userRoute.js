const express = require('express');
const { createNewUser, getAllUsers, getUserDetails } = require('../controllers/userController');

const router = express.Router();

router.post('/', createNewUser);
router.get('/', getAllUsers);
router.get('/:userId', getUserDetails);


module.exports = router;
