import asyncHandler from 'express-async-handler';
import moment from 'moment';
import Item from '../models/itemModel.js';
import History from '../models/historyModel.js';


class itemController {

    // @desc    Add new item
    // @route   POST /api/items
    // @access  Private
    static addItem = asyncHandler(async (req, res) => {
        const { name, buyPrice, sellPrice, qty } = req.body;

        if (!name || !buyPrice || !sellPrice || !qty) {
            return res.json({
                success: false,
                message: `Please fill all required fields`
            });
        }

        const findByName = await Item.findOne({ name });

        if (findByName) {
            return res.json({
                success: false,
                message: `${name} already exists in your inventory`
            });
        }

        const item = new Item({
            name,
            buyPrice,
            sellPrice,
            qty,
            user: req.user._id,
        });

        const createdItem = await item.save();
        res.status(201).json({
            success: true,
            message: 'Item saved successfully',
            data: createdItem,
        });
    });


    // @desc    Fetch user items by user id
    // @route   GET /api/items
    // @access  Private
    static getItems = asyncHandler(async (req, res) => {
        const items = await Item.find({ user: req.user._id });
        if (items) {
            res.status(200).json({
                success: true,
                message: 'Items fetched successfully',
                data: items,
            });
        }
    });


    // @desc    Delete a item
    // @route   DELETE /api/items/:id
    // @access  Private
    static deleteItem = asyncHandler(async (req, res) => {
        const item = await Item.findByIdAndDelete(req.params.id);

        if (item) {
            res.status(200).json({ message: 'Item removed successfully.', success: true });
        } else {
            res.status(404).json({ message: 'Item Not Found.', success: false });
        };
    });


    // @desc    Update a item
    // @route   PUT /api/items/:id
    // @access  Private
    static updateItem = asyncHandler(async (req, res) => {
        const { name, buyPrice, sellPrice, qty } = req.body;

        const item = await Item.findById(req.params.id);

        if (item) {
            item.name = name;
            item.buyPrice = buyPrice;
            item.sellPrice = sellPrice;
            item.qty = qty;

            const updatedItem = await item.save();
            res.json({
                message: 'Item updated successfully',
                data: updatedItem,
                success: true,
            });
        } else {
            res.status(404).json({ message: 'Product not found.', success: false });
        };
    });


    // @desc    sell a item and add into history
    // @route   PUT /api/items/sell/:id
    // @access  Private

    static sellItem = asyncHandler(async (req, res) => {
        const { name, buyPrice, sellPrice, qty } = req.body;

        if (name == '' || buyPrice == '' || sellPrice == '' || qty == '') {
            return res.json({
                success: false,
                message: `Please select any item`
            });
        }

        const item = await Item.findById(req.params.id);

        if (item && item.qty > 0) {
            item.qty = item.qty > 0 ? item.qty - qty : item.qty;

            const updatedItem = await item.save();

            if (updatedItem) {
                await History.create({
                    user: req.user._id,
                    item: item._id,
                    name,
                    qty,
                    sellPrice,
                    buyPrice,
                    date: moment().format('YYYY-MM-DD')
                });
                res.json({
                    message: 'Stock updated successfully',
                    success: true,
                    updatedItem,
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: '500 Internal server error, Item not updated, due to server issue.'
                });
            };
        } else {
            res.json({ message: `${name} is out of stock.`, success: false });
        };
    });

    // @desc    Get all selling history
    // @route   GET /api/items/sells
    // @access  Private

    static getSellItems = asyncHandler(async (req, res) => {
        const items = await History.find({ user: req.user._id });
        if (items) {
            res.status(200).json({
                success: true,
                message: 'Selling History fetched successfully',
                data: items,
            });
        };
    });


    // @desc    Delete a item
    // @route   DELETE /api/items/sell:id
    // @access  Private
    static deleteSellItem = asyncHandler(async (req, res) => {
        const item = await History.findByIdAndDelete(req.params.id);

        if (item) {
            res.status(200).json('Item removed successfully.');
        } else {
            res.status(404).json({ message: 'Item Not Found.' });
        };
    });
};

export default itemController;