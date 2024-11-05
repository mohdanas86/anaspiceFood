import express from "express";
import dishModel from "../models/dishModel.js";

const dishRouter = express.Router();

dishRouter.get("/dishes", async (req, res) => {
    try {
        // const data = req.body;
        const dish = await dishModel.find()
        return res.status(200).json({
            message: "dishes",
            data: dish
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "geting dish error",
            error: err
        });
    }
})

dishRouter.post("/newdish", async (req, res) => {
    try {
        const data = req.body;
        const dish = await dishModel.create(data);
        return res.status(200).json({
            message: "new dish added",
            dish: dish
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "dish adding error",
            error: err
        });
    }
})

export default dishRouter;