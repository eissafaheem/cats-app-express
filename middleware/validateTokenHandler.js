const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const dotenv= require("dotenv").config();

const validateAccessToken = asyncHandler( (req,res,next) =>{
    const accessToken = req.headers.authorization || req.headers.Authorization;
    if(!accessToken){
        res.status(403)
        res.json({title: "Eisa"})
        throw new Error("Access token required");
    }
    if(accessToken.startsWith("Bearear")){
        accessToken = accessToken.split(" ")[1];
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
        if(err){

        }
        req.user  = decoded.user;
        next();
    });
});

module.exports = validateAccessToken;