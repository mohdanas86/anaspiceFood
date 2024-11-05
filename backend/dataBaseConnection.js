import mongoose from "mongoose";

const url = 'mongodb+srv://anas:anas@food.t6wubmw.mongodb.net/foodApp?retryWrites=true&w=majority&appName=food'

const dataBaseConnection = () => {
    mongoose.connect(url)
        .then((db) => {
            console.log("db connected");
        })
        .catch((err) => {
            console.log(err)
        })
}

export default dataBaseConnection;