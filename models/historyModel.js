import mongoose from "mongoose";


const historySchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        item: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Item',
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        buyPrice: {
            type: Number,
            required: true,
            trim: true,
        },
        sellPrice: {
            type: Number,
            required: true,
            trim: true,
        },
        qty: {
            type: String,
            required: true,
            trim: true,
        },
        date: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const History = mongoose.model('History', historySchema);

export default History;