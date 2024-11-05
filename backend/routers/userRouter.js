// Import necessary modules for routes
import express from "express";
import userModel from "../models/userModel.js";

const userRouter = express.Router();

// LOGIN ROUTER
userRouter.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        // Use findOne instead of find
        const existUser = await userModel.findOne({ username });
        if (!existUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Generate token
        const token = await existUser.generateToken();
        return res.status(200).json({
            message: "Logged in successfully",
            data: existUser,
            token: token
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Login user error",
            error: err
        });
    }
});

// REGISTER ROUTER
userRouter.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existUser = await userModel.findOne({ username });

        if (existUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        // Create a new user
        const newUser = await userModel.create({ username, email, password });

        // Generate token for the new user
        const token = await newUser.generateToken();

        return res.status(201).json({
            message: "Account created",
            data: newUser,
            token: token
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Register user error",
            error: err
        });
    }
});

export default userRouter;
