const multer = require('multer');
const path = require('path');

// Configure multer storage for images
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/images');
    },
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        callback(null, uniqueSuffix);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            const error = new Error(`Only ${allowedMimeTypes.join(', ')} allowed to upload!`);
            error.status = 400;
            callback(error, false);
        }
    }
});

module.exports = { image: upload };
