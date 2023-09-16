const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const dotenv= require("dotenv").config();

const validateAccessToken = asyncHandler( (req,res,next) =>{
    let accessToken = req.headers.authorization || req.headers.Authorization;
    if(!accessToken){
        res.status(403)
        throw new Error("Access token required");
    }
    if(accessToken.startsWith("Bearer")){
        accessToken = accessToken.split(" ")[1];
    }
    console.log(accessToken)

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
        if(err){
            console.log(err)
            res.status(401);
            throw new Error("Invalid access token")
        }
        req.user  = decoded.user;
        next();
    });
});

module.exports = validateAccessToken;