const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { v4 } = require('uuid');

const uploadPath = path.join(__dirname, '../../../public/bantuan');

const storage = (entityPath = '') => {
    return multer.diskStorage({
        destination: function (_req, _file, cb) {
            const dir = path.join(uploadPath, entityPath);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir);

            cb(null, dir);
        },
        filename: function (_req, file, cb) {
            cb(null, `${v4() + path.extname(file.originalname)}`);
        },
    });
};

const fileFilter = (_req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'application/pdf'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

module.exports = function (entityPath = '') {
    return multer({
        storage: storage(entityPath),
        limits: {
            fileSize: 1024 * 1024 * 10, // Max file size = 10 MB
        },
        fileFilter: fileFilter,
    });
};
