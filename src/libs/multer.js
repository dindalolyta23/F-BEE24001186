const multer = require("multer");

const uploadImage = () => {
    return multer({
        fileFilter: (req, file, cb) => {
            const allowedMimesTypes = ["image/jpeg", "image/png", "image/png"];
            if (allowedMimesTypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                const err = new Error400(`Only ${allowedMimesTypes.join(", ")} are allowed to upload`);
                cb(err, false);
            }
        },
        limits: {
            fileSize: 1024 * 1024 * 2, // 2MB
        },
    });
};

module.exports = {
    uploadImage,
};