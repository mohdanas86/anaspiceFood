// import jwt from 'jsonwebtoken';
// import express from "express";
// import userModel from "../models/userModel.js";

// const protectRouter = async (req, res, next) => {
//     const token = req.header("Authorization");

//     if (!token || !token.startWith("Bearer ")) {
//         return res.status(401).json({ message: "Unauthorized: Token not provided" });
//     }

//     // Extract JWT from the token
//     const jwtToken = token.replace("Bearer ", " ").trim();

//     try {
//         // Verify the JWT
//         const isVerified = jwt.verify(jwtToken, process.env.JWT_KEY);

//         const user = await userModel.findOne({ email: isVerified.email }).select('-password');

//         if (!user) {
//             return res.status(401).json({ message: "Unauthorized: User not found" });
//         }

//         // Attach user data and token to request object
//         req.token = token;
//         req.user = user;
//         req.userId = userData._id;

//         next(); // Proceed to the next middleware

//     } catch (err) {
//         return res.status(401).json({
//             message: "protectRouter error",
//             error: err
//         })
//     }
// }

// export default protectRouter;

import jwt from 'jsonwebtoken';
import express from "express";
import userModel from "../models/userModel.js";

const protectRouter = async (req, res, next) => {
    const token = req.header("Authorization");

    // Check if token is provided and has the correct format
    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: Token not provided" });
    }

    // Extract JWT from the token
    const jwtToken = token.replace("Bearer ", "").trim();

    try {
        // Verify the JWT
        const isVerified = jwt.verify(jwtToken, process.env.JWT_KEY || "ANASFOODMANAGEMENTSYSTEM");

        // Find user by email from the verified token payload
        const user = await userModel.findOne({ email: isVerified.email }).select('-password');

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        // Attach user data and token to request object
        req.token = jwtToken;
        req.user = user;
        req.userId = user._id;

        next(); // Proceed to the next middleware

    } catch (err) {
        return res.status(401).json({
            message: "Authorization error",
            error: err.message
        });
    }
};

export default protectRouter;
