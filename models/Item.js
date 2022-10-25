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
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parentCollection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
        required: true
    },
    imageUrl: String,
    numberAttributes: {
        type: Map,
        of: Number,
    },
    dateAttributes: {
        type: Map,
        of: Date,
    },
    stringAttributes: {
        type: Map,
        of: String,
    },
    textAttributes: {
        type: Map,
        of: String,
    },
}, {
    timestamps: true
})

export default mongoose.model('Item', ItemSchema)