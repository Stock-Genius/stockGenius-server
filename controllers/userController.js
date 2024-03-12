import User from '../models/userModel.js';
import asyncHandler from "express-async-handler";
import generateToken from '../utils/generateToken.js';




class userController {

    // @desc    Register a new user
    // @route   POST /api/users
    // @access  Public
    static register = asyncHandler(async (req, res) => {
        const { name, email, password, confirmPassword, shopname, address, isAdmin, img } = req.body;

        const userExists = await User.findOne({ email });

        if (name == '' || email == '' || password == '' || confirmPassword == '' || shopname == '' || address == '') {
            res.status(401).json({
                success: false,
                message: 'Please fill all inputs fields.'
            });
        }
        else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            res.status(401).json({
                success: false,
                message: `${email} is not a valid email address.`
            });
        }
        else if (userExists) {
            res.status(401).json({
                success: false,
                message: `Email address already exists.`
            });
        }
        else if (password !== confirmPassword) {
            res.status(401).json({
                success: false,
                message: `passwords do not matched.`
            });
        }
        else if (password.length < 6) {
            res.status(401).json({
                success: false,
                message: `Password must be at least 6 characters.`
            });
        }
        else {
            const user = await User.create({
                name,
                email,
                password,
                shopname,
                address,
                isAdmin,
                img
            });

            res.status(200).json({
                success: true,
                message: 'User Created Successfully',
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    shopname: user.shopname,
                    address: user.address,
                    isAdmin: user.isAdmin,
                    img: img,
                    token: generateToken(user._id),
                }            
            });
        };
    });

    // @desc    login user & get token
    // @route   POST /api/users/login
    // @access  Public
    static login = asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        if (email === '' || password === '') {
            res.status(401).json({
                success: false,
                message: 'Please fill all inputs fields.'
            });
        }
        else {
            const user = await User.findOne({ email });

            if (user && (await user.matchPassword(password))) {
                res.status(200).json({
                    success: true,
                    message: 'Login successfully',
                    data: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        shopname: user.shopname,
                        address: user.address,
                        isAdmin: user.isAdmin,
                        img: user.img,
                        token: generateToken(user._id),
                    }
                });
            }
            else {
                res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            };
        };
    });


    // @desc    Update user profile
    // @route   PUT /api/users/profile
    // @access  Private
    static updateUserProfile = asyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id)

        if (user) {
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            user.shopname = req.body.shopname || user.shopname
            user.address = req.body.address || user.address
            user.img = req.body.img || user.img

            if (req.body.password) {
                user.password = req.body.password
            }

            const updatedUser = await user.save()

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                shopname: updatedUser.shopname,
                address: updatedUser.address,
                isAdmin: updatedUser.isAdmin,
                img: updatedUser.img,
                token: generateToken(updatedUser._id),
            })
        } else {
            res.status(404).json({ message: "User Not found" });
        }
    })

    // @desc    Get user profile
    // @route   GET /api/users/profile
    // @access  Private
    static getUserProfile = asyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                shopname: user.shopname,
                img: user.img,
                isAdmin: user.isAdmin,
                address: user.address,
            })
        } else {
            res.status(404).send({
                message: 'User not found.',
                success: false,
            })
        }
    });

    // @desc    Get all users
    // @route   GET /api/users
    // @access  Private/Admin
    static getUsers = asyncHandler(async (req, res) => {
        const users = await User.find({});
        res.json(users);
    });

};

export default userController;