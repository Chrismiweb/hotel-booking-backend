const userModel = require("../models/User.model")



const register = async(req, res)=>{
    try {
        const {userName, email, password} = req.body
    if(!userName || !email || !password){
        return res.status(401).json({message: "please input all credentials before registering"})
    }
    const checkUser = await userModel.findOne({email})
    if(checkUser){
        return res.status(401).json({message: "user with this email already have an accountt"})
    }
    const registerUser = await new userModel({userName, email, password})
    if(!registerUser){
        return res.status(401).json({message: "unable to register this account"})
    }
    // userModel.save()

    res.status(200).json({message: "registered an account succesfully", registerUser})
    } catch (error) {
        console.log(error.message);
        
    }
}


const login = async(req,res)=>{

}

module.exports = {
    register,
    login
}