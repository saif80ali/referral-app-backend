const multer  = require('multer');
const fs = require("fs");
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const id = req.userid;
        const uploadDir = path.join(__dirname, `../../uploads/${id}`);
        if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
        }
        return cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // Extract the original file extension
        const fileExtension = path.extname(file.originalname);
        
        // Construct the new filename with original name and unique suffix
        const newFilename = file.originalname + '-' + uniqueSuffix + fileExtension;
        cb(null, newFilename);
    }
})

// Maximum size is 5MB
const limits = { fileSize: 5 * 1024 * 1024 }

// Accept only PDF files
const fileFilter = function (req, file, cb) {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed'), false);
        }
    }

const upload = multer({ storage: storage, limits: limits, fileFilter: fileFilter})

module.exports = upload;

// code for multer