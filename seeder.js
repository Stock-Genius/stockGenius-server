import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from "./config/db.js";
import User from "./models/userModel.js";
import users from "./data/users.js";
import Item from "./models/itemModel.js";
import items from "./data/items.js";
import History from "./models/historyModel.js";

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Item.deleteMany();
        await History.deleteMany();
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        const sampleItems = items.map((item) => {
            return { ...item, user: adminUser };
        });
        await Item.insertMany(sampleItems);
        // console.log(sampleItems[0].user['id'],'created');
        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    };
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Item.deleteMany();
        await History.deleteMany();

        console.log('Data Destroyed!'.red.inverse)
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    };
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
};