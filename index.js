const express = require('express');
const port =1000
//  multer is used to upload files in node js

const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const app  = express()
const bodyParser = require('body-parser')
const expressFilUpload = require('express-fileupload');
const {connectMongoose} = require('./db/connectDb');
const hotelModel = require('./models/Hotel');
const {router} = require('./route/user');



// use express
app.use(express.json())

// router 
app.use('/', router)

// use express file upload
app.use(expressFilUpload());

// use body-parser
app.use(bodyParser.urlencoded({extended:false}))

app.get('/', (req,res)=>{
    res.send("this app is running")
})

app.listen(port, async() => {
    console.log(`Server started on port ${port}`);
    await connectMongoose()
});