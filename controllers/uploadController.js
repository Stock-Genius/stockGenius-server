import multer from 'multer';
import { userProfileStorage, productStorage } from '../config/multerConfig.js';


const uploadUserProfile = multer({ storage: userProfileStorage });
const uploadProduct = multer({ storage: productStorage });


//  Uploading user profile image Controller
const uploadUserProfileImage = (req, res) => {
    uploadUserProfile.single('userImage')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.log(err);
            res.status(500).json({ error: 'An error occurred while uploading the image.' });
        } else if (err) {
            console.log(err);
            res.status(500).json({ error: 'An unknown error occurred.' });
        } else {
            const imageUrl = req.protocol + '://' + req.get('host') + '/uploads/users/' + req.file.filename;
            res.json(imageUrl);
        }
    });
};


// Uploading product image Controller
const uploadProductImage = (req, res) => {
    uploadProduct.single('productImage')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.log(err);
            res.status(500).json({ error: 'An error occurred while uploading the image.' });
        } else if (err) {
            console.log(err);
            res.status(500).json({ error: 'An unknown error occurred.' });
        } else {
            const imageUrl = req.protocol + '://' + req.get('host') + '/uploads/products/' + req.file.filename;
            res.json(imageUrl);
        }
    });
};

export { uploadUserProfileImage, uploadProductImage };