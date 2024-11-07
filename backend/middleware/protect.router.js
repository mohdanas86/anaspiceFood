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

// import jwt from 'jsonwebtoken';
// import express from "express";
// import userModel from "../models/userModel.js";

// const protectRouter = async (req, res, next) => {
//     const token = req.header("Authorization");

//     // Check if token is provided and has the correct format
//     if (!token || !token.startsWith("Bearer ")) {
//         return res.status(401).json({ message: "Unauthorized: Token not provided" });
//     }

//     // Extract JWT from the token
//     const jwtToken = token.replace("Bearer ", "").trim();

//     try {
//         // Verify the JWT
//         const isVerified = jwt.verify(jwtToken, process.env.JWT_KEY || "ANASFOODMANAGEMENTSYSTEM");

//         // Find user by email from the verified token payload
//         const user = await userModel.findOne({ email: isVerified.email }).select('-password');

//         if (!user) {
//             return res.status(401).json({ message: "Unauthorized: User not found" });
//         }

//         // Attach user data and token to request object
//         req.token = jwtToken;
//         req.user = user;
//         req.userId = user._id;

//         next(); // Proceed to the next middleware

//     } catch (err) {
//         return res.status(401).json({
//             message: "Authorization error",
//             error: err.message
//         });
//     }
// };

// export default protectRouter;

import jwt from 'jsonwebtoken';
import express from 'express';
import userModel from '../models/userModel.js';


const protectRouter = async (req, res, next) => {
    const token = req.header('Authorization');

    // Check if token is provided and has the correct format
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }

    // Extract JWT from the token
    const jwtToken = token.replace('Bearer ', '').trim();

    try {
        // Verify the JWT
        const isVerified = jwt.verify(jwtToken, process.env.JWT_KEY || 'ANASFOODMANAGEMENTSYSTEM');

        // Find user by email from the verified token payload
        const user = await userModel.findOne({ email: isVerified.email }).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        // Generate a new JWT token
        const newToken = jwt.sign({ email: user.email }, process.env.JWT_KEY || 'ANASFOODMANAGEMENTSYSTEM', { expiresIn: '30d' });

        // Attach user data and token to request object
        req.token = newToken;  // Store the new token in req.token
        req.user = user;
        req.userId = user._id;

        // Optionally, send the new token in the response (if required by your flow)
        res.setHeader('Authorization', `Bearer ${newToken}`);

        // Proceed to the next middleware
        next();

    } catch (err) {
        // Check if the error is due to the token being expired
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Authorization error: Token has expired',
                error: err.message,
            });
        }

        // For other errors (like JsonWebTokenError)
        return res.status(401).json({
            message: 'Authorization error',
            error: err.message,
        });
    }
};



export default protectRouter;
