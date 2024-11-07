import express from "express"
import http from "http"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from 'dotenv';
dotenv.config();  // Loads environment variables from .env file


const app = express();
const server = http.createServer(app);

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

// LIVE SERVER
server.listen(3001, () => {
    console.log(`http://localhost:3001/`)
})

// DATABASE CONNECTION
import dataBaseConnection from "./dataBaseConnection.js";
dataBaseConnection();

// USER ROUTER [ LOGIN, REGISTER ]
import userRouter from "./routers/userRouter.js"
app.use("/api", userRouter);

// DISH ROUTER [ NEW DISH, FIND DISH ]
import dishRouter from "./routers/dishRouter.js";
app.use("/api", dishRouter);

// ORDER ROUTER [ NEW ORDER, FIND ORDER ]
import orderRouter from "./routers/orderRouter.js";
app.use("/api", orderRouter)

// USER AUTH ROUTER [ LOGIN ]
import UserAuth from "./routers/UserAuth.js";
app.use("/api", UserAuth)
