import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { getFromEnv } from "../../utils/getFromEnv.js";
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Please enter your email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    },
}, {
    timestamps: true
});
userSchema.method('matchPassword', async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
});
// Encrypt password using bcrypt
userSchema.pre('save', function (next) {
    const { rounds } = getFromEnv();
    if (this.password) {
        this.password = bcrypt.hashSync(this.password, rounds);
    }
    next();
});
export const UserModel = mongoose.model('user', userSchema);
