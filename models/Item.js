import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        default: []
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{
        user: {
            type: {},
            required: true
        },
        text: {
            type: String,
            required: true,
        },
        addedAt: {
            type: Date,
            required: true,
            default: Date.now()
        }

    }],
    parentCollection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
        required: true
    },
    imageUrl: String,
    numberAttributes: [{
        type: Map,
        // of: Number,
    }],
    dateAttributes: [{
        type: Map,
        // of: Date,
    }],
    stringAttributes: [{
        type: Map,
        // of: String,
    }],
    textAttributes: [{
        type: Map,
        // of: String,
    }],
}, {
    timestamps: true
})

ItemSchema.index({ "$**": "text" });

export default mongoose.model('Item', ItemSchema)