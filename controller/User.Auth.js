const userModel = require("../models/User.model")
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

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
            password: hashedPassword
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
                pass: 'Wolfpackn3',
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
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// const register = async(req, res)=>{
//     try {
//         const {userName, email, password} = req.body
//     if(!userName || !email || !password){
//         return res.status(401).json({message: "please input all credentials before registering"})
//     }
//     const checkUser = await userModel.findOne({email})
//     if(checkUser){
//         return res.status(401).json({message: "user with this email already have an accountt"})
//     }
//     // salt and hash password
//     const saltPassword = bcrypt.genSaltSync(20);
//     const hash = bcrypt.hashSync(password, saltPassword);

//     const registerUser = await new userModel({
//         userName, 
//         email, 
//         password: hash
//     })
//     // token generator using JWT token
//     const id = registerUser._id.toString()
//     const token = jwt.sign(id, process.env.JWT_SECRET);
//     registerUser.token = token


//     // create nodemailer
//     const transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//             user: 'chrismibiteso@gmail.com'
//             // user: process.env.ADMIN_EMAIL,
//             // pass: process.env.ADMIN_PASSWORD,
//         },
//     });
//     // email message
//     const message = String.raw`
//             <!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>Document</title>
//         </head>
//         <body>
//             <p>Verify your email</p>

//             <p>
//                 Kindly click on the button below to verify your email address
//                 <br />
//                 <a href=${`${process.env.FRONTEND_URL}register/verify/${token}`}
//                     >Click button to verify your account</a
//                 >
//                 <br />
//                 Please click on the button to proceed with your account creation. 
//                 <br />
//                 <br />
//                 If you did not initiate this verification, kindly ignore this email and
//                 avoid sharing this code with a third party
//             </p>
//         </body>
//         </html>
//     `
//     await transporter.sendMail({
//         from: 'chrismibiteso@gmail.com', // sender address
//         to: email, // list of receivers
//         subject: "Emmail Verification", // Subject line
//         // text: "Hello world?", // plain text body
//         html: message, // html body
//       });

//         res.status(200).json({
//             success: true,
//             message: "Registered sucessfully",
//             registerUser,
//         })
//     } catch (error) {
//         console.log(error.message);
        
//     }
// }


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