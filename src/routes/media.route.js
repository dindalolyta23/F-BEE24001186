// const router = require('express').Router();
// const storage = require('../libs/multer');
// const { uploadImage } = require('../controllers/mediaController');

// router.post('/images', storage.image.single('image'), uploadImage);

// module.exports = router;
const router = require('express').Router();
const storage = require('../libs/multer.js');
const { storageImage } = require('../controllers/mediacontroller.js');

router.post('/images', storage.image.single('image'), storageImage);
router.post('/upload', mediaController.uploadImage);

module.exports = router;
