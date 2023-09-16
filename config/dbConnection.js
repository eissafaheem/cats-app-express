const mongoose  = require("mongoose")
const dotenv = require("dotenv").config();

const connectDb = async () => {
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_URL);
        console.log("Datebase connected")
    }   
    catch(err){
        console.log(err)
    }
}

module.exports = connectDb;