import express from "express";
import protectRouter from "../middleware/protect.router.js";

const UserAuth = express.Router();

// Define the route path as a string (e.g., "/user")
UserAuth.get("/user", protectRouter, getUserAuth);

async function getUserAuth(req, res) {
    try {
        const data = req.user;

        console.log("Logged in user data: ", data);
        return res.json({ data });

    } catch (err) {
        console.error("Error fetching user data:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default UserAuth;
