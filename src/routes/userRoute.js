const express = require('express');
const { createNewUser, getAllUsers, getUserDetails, uploadImageProfile } = require('../controllers/userController');
const { uploadImage } = require('../libs/multer');

const router = express.Router();

router.post('/', createNewUser);
router.get('/', getAllUsers);
router.get('/:userId', getUserDetails);
router.patch('/my-profile/image', uploadImage().single('image'), uploadImageProfile);

module.exports = router;
