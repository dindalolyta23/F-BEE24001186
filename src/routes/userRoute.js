const express = require('express');
const { createNewUser, getAllUsers, getUserDetails } = require('../controllers/userController');

const router = express.Router();

router.post('/', createNewUser);
router.get('/', getAllUsers);
router.get('/:userId', getUserDetails);

export default (app) => {
    const router = Router();
    app.use('/users', router);
    const userController = new UserController();
  
    router.get('/', userController.getAllUsers.bind(userController));
  
    router.get('/:id', userController.getUserById.bind(userController));
    router.put('/:id/image', upload.single('image'), userController.addImageProfile.bind(userController));
  };

module.exports = router;
