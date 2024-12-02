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
        const profilePic = `https://avatar.iran.liara.run/username?username=${username}`;


        // Check if user already exists
        const existUser = await userModel.findOne({ username });

        if (existUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        // Create a new user
        const newUser = await userModel.create({ username, email, password, profilePic }, { new: true });

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

// UPDATE USER DATA
// userRouter.patch("/update-profile", async (req, res) => {
//     try {
//         const { username, email, userId } = req.body; // Destructure the data received in the request

//         // Update the user with the provided userId
//         const update = await userModel.findByIdAndUpdate(
//             userId, // Use findByIdAndUpdate and pass userId
//             { username, email }, // Fields to update
//             { new: true } // Return the updated document
//         );

//         console.log(update)

//         if (!update) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         return res.status(200).json({
//             message: "User updated successfully",
//             data: update,
//         });
//     } catch (err) {
//         console.log("Error updating user :", err);
//         return res.status(500).json({
//             message: "Error updating user",
//             error: err,
//         });
//     }
// });

userRouter.patch("/update-profile", async (req, res) => {
    try {
        const { username, email, userId } = req.body; // Destructure data from the request body

        // Update the user by userId
        const update = await userModel.findByIdAndUpdate(
            userId,                // Use findByIdAndUpdate with userId
            { username, email },   // Fields to update
            { new: true }          // Return the updated document
        );

        console.log(update);

        if (!update) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "User updated successfully",
            data: update,
        });
    } catch (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({
            message: "Error updating user",
            error: err.message || err, // Ensure meaningful error response
        });
    }
});


export default userRouter;