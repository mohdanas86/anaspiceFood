// Import necessary modules
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

// USER SCHEMA
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
});

// Generate JWT token method on schema
userSchema.methods.generateToken = async function () {
    return jwt.sign(
        {
            username: this.username,
            id: this._id.toString(),
            email: this.email
        },
        process.env.JWT_KEY, // Secret key, ideally stored in environment variable
        { expiresIn: "2d" }
    );
};

// USER MODEL
const userModel = mongoose.model("user", userSchema);
export default userModel;