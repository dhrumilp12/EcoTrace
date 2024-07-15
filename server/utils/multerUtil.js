// Exported multer object with S3 storage and file filter for image and video files
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../config/awsConfig');

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'ecotrace',
        
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname); // Use Date.now() to prefix file names to avoid overwrites
        }
    }),
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'video/mp4') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type, only JPG, PNG, and MP4 are allowed!'), false);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB limit per file
    }
});

module.exports = upload;
