import mongoose from "mongoose";


const itemSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
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
        img: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true,
    }
);

const Item = mongoose.model('Item', itemSchema);

export default Item;