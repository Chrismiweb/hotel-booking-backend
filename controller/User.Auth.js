const userModel = require("../models/User.model")
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { userName, email, password, role } = req.body;

        // Validate input fields
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "Please input all credentials before registering" });
        }

        // Check if user already exists
        const checkUser = await userModel.findOne({ email })
        if (checkUser) {
            return res.status(400).json({ message: "User with this email already has an account" });
        }

        // Salt and hash password
        const salt = bcrypt.genSaltSync(10); // Reduced salt rounds to 10 for better performance
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Create and save new user
        const registerUser = new userModel({
            userName,
            email,
            password: hashedPassword, 
            role
        });

        // Generate JWT token
        const token = jwt.sign({ id: registerUser._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });
        registerUser.token = token;

        // Save user to database
        await registerUser.save();

        // Create Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'chrismibiteso@gmail.com',
                pass: 'ybpq axvn udtd tpzg',
            },
        });

        // Email message
        const message = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Verification</title>
            </head>
            <body>
                <p>Verify your email</p>
                <p>
                    Kindly click on the button below to verify your email address:
                    <br />
                    <a href="${process.env.FRONTEND_URL}/register/verify/${token}">
                        Click here to verify your account
                    </a>
                    <br />
                    If you did not initiate this verification, kindly ignore this email.
                </p>
            </body>
            </html>
        `;

        // Send verification email
        await transporter.sendMail({
            from: 'chrismibiteso@gmail.com', // sender address
            to: email, // receiver email
            subject: "Email Verification", // Subject line
            html: message, // HTML body
        });

        // Respond with success message
        res.status(201).json({
            success: true,
            message: "Registered successfully. Please check your email to verify your account.",
            registerUser,
            token
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



const login = async(req,res)=>{
    const {email, password} = req.body
    if(!email || !password){
        res.json({message: "please fill all credential to login "})
    }
    const checkUser = await userModel.findOne({email})
    if(!checkUser){
        return res.status(201).json({message: "User not found"})
    }

    // generate user token
    const token = jwt.sign({ id: checkUser._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // compare password
    const comparePassword = await bcrypt.compare(password, checkUser.password)
    if(!comparePassword){
        return res.status(401).json({error: "invalid password"})
    }

    res.status(200).json({
        message: "Login Successfully",
        checkUser,
        token
    })
}

const sendVerificationLink = ()=>{

}

const verifyAccount = async(req, res) =>{
    const {email} = req.user
    const user = await userModel.findOne({email})

    let token = user.token
    if(!token){
        
    }
}

module.exports = {
    register,
    login,
    verifyAccount
}