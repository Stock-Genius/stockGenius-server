import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/products');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post('/products', upload.single('productImage'), (req, res) => {
    const imageUrl = req.protocol + '://' + req.get('host') + '/uploads/products/' + req.file.filename;
    res.json(imageUrl);

});

export default router;