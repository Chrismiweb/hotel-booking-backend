const userModel = require("../models/User.model")
const jwt = require("jsonwebtoken")
require("dotenv").config()

// const isLoggedIn = async(req,res, next)=>{
//     let token

//     if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
//         try {
//             token = req.headers.authorization.split(' ')[1]
//             const decoded = jwt.verify(token, process.env.JWT_SECRET)
//             req.user = await userModel.findById(decoded.userId)
//             if (!token) {
//                 return res.status(401).json({ error: "Not authorized, no token provided" });
//             }

//         } catch (error) {
//          console.log(error);
//          res.json({error: "invalid token"})
            
//         }
//     }
//     if(!token) {
//         return res.status(401).json({error: "token is missing from the header"});
//     }
//     return next()
// }

const isLoggedIn = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.jwt_secret);
            console.log('Decoded Token:', decoded); // Check the structure

            // Use the correct property from the decoded token
            req.user = await userModel.findById(decoded.id).select('-password');

            if (!req.user) {
                console.log('User not found for ID:', decoded.id);
                return res.status(401).json({ error: "Not authorized, please login" });
            }
        } catch (error) {
            console.error("Token verification failed:", error.message);
            return res.status(403).json({ error: "Invalid token" });
        }
    }

    if (!token) {
        return res.status(401).json({ error: "Token is missing from the header" });
    }

    next();
};



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