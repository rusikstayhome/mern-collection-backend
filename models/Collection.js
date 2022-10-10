import mongoose from 'mongoose';

const CollectionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        topic: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        imageUrl: String,
        items: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
            required: true
        }]
    },
    {
        timestamps: true
    }
)