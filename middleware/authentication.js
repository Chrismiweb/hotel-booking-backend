const userModel = require("../models/User.model")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const isLoggedIn = async(req,res, next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await userModel.findById(decoded.userId)
            if (!token) {
                return res.status(401).json({ error: "Not authorized, no token provided" });
            }

        } catch (error) {
         console.log(error);
         res.json({error: "invalid token"})
            
        }
    }
    if(!token) {
        return res.status(401).json({error: "token is missing from the header"});
    }
    return next()
}


const isAdmin = (req, res, next)=>{
    if(!req.user){
        return res.status(401).json({error: "not authorized, pls login"}); 
    }

    if(req.user.role !== "admin" ){
        return res.status(401).json({error: "not authorized, you're not an admin"}); 
    }
    next()
}



module.exports = {
    isLoggedIn,
    isAdmin
}