import mongoose from "mongoose";

const dataBaseConnection = () => {
    mongoose.connect(process.env.DATA_BASE)
        .then((db) => {
            console.log("db connected");
        })
        .catch((err) => {
            console.log(err)
        })
}

export default dataBaseConnection;