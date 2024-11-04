const express = require('express');
const { createNewUser, getAllUsers, uploadImage } = require('../controllers/userController');

const router = express.Router();

router.post('/', createNewUser);
router.get('/', getAllUsers);
router.get('/:userId', getUserDetails);
 
router.get('/:userId', uploadImage);

module.exports = router;
