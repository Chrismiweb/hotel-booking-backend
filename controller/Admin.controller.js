const userModel = require("../models/User.model")


// get single user
const SingleRegisteredUser = async(req,res) =>{
    const {email} = req.params
    const getUser = await userModel.findOne({email})
    if(!getUser){
        res.status(404).json({error: "user not available"})
    }
    res.status(200).json({getUser})
}

// to get all registered users
const allRegisteredUsers = async(req, res)=>{
    const registeredUsers = await userModel.find()
    if(!registeredUsers){
        return res.status(404).json({message: "there is no registered user available"})
    }
    res.status(200).json({AllUSers: registeredUsers})
}

// delete a user
const deleteSingleUser = async(req, res)=>{
    const {email} = req.params
    const checkUser = await userModel.findOneAndDelete({email})
    if(!checkUser){
        return res.status(404).json({error: "user does not exist"})
    }
    res.status(200).json({message: "user account was deleted successfully"})
}

// delete all the users registered
const deleteAllUsers = async(req,res) =>{
    const deleteAll = await userModel.deleteMany()
    if(!deleteAll){
        return res.status(401).json({error: "unable to delete all users account because there is no account available"})
    }
    res.status(200).json({message: "all users were deleted successfully"})

}






module.exports = {
    allRegisteredUsers,
    deleteSingleUser,
    deleteAllUsers,
    SingleRegisteredUser
}