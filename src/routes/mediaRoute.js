const router = require('express').Router();
const storage = require('../libs/multer');
const { uploadImage } = require('../controllers/mediaController');

router.post('/images', storage.image.single('image'), uploadImage);

module.exports = router;
