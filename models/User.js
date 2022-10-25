import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true,
    },
    roles: [{ type: String, ref: 'RoleModel' }],
    avatarUrl: String
}, {
    timestamps: true
});

export default mongoose.model('User', UserSchema)