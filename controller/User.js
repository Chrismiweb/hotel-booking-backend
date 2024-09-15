const userModel = require("../models/User.model")
const bcrypt = require('bcrypt');


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
    // salt and hash password
    const saltPassword = bcrypt.genSaltSync(20);
    const hash = bcrypt.hashSync(password, saltPassword);

    const registerUser = await new userModel({userName, email, password: hash})
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
    const {email, password} = req.body
    if(!email || !password){
        res.json({message: "please fill all credential to login "})
    }
    const checkUser = await userModel.findOne({email})
    if(!checkUser){
        return res.status(201).json({message: "User not found"})
    }

    // compare password
    const comparePassword = await bcrypt.compare(password, checkUser.password)
    if(!comparePassword){
        return res.status(401).json({error: "invalid password"})
    }

    res.status(200).json({message: "Login Successfully"})

    
    
}

module.exports = {
    register,
    login
}