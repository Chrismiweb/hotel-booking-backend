const express = require('express');
const port =1000
//  multer is used to upload files in node js
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const app  = express()
const bodyParser = require('body-parser')
const expressFilUpload = require('express-fileupload')

// use express
app.use(express.json())

// use express file upload
app.use(expressFilUpload());

// connect mongoose 
    const connectString = process.env.connectString
    async function connectMongoose (){
        await mongoose.connect(connectString)
        console.log("database was connected sucessfully")
    }
    // schema and model
    const hotelSchema = new mongoose.Schema({
        image : {
            require : true,
            type: String
        },
        hotelName : {
            require: true,
            type: String
        },
        price: {
            require: true,
            type: Number
        },
        address : {
            require: true,
            type: String
        }
    })

    const hotelModel = new mongoose.model('createHotel', hotelSchema )

    // create hotel 
   app.post('/api/v1/createHotel', async(req,res)=>{
        const {hotelName, price,address} = req.body
       
        if(!hotelName || !price || !address){
            return res.json({error: "Please upload all credential"})
        }

        let hotelImage;
        let uploadPath;
        let fileName;

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        hotelImage = req.files.image;
        fileName = "/uploads/" + new Date().getTimezoneOffset() + hotelImage.name

        uploadPath = __dirname + '/uploads/' + hotelImage.name;

        hotelImage.mv(uploadPath, function(err) {
            if (err) {
              return res.status(500).json({err: "New Error: " + err.message});
            }

        })

        const uploadHotel = new hotelModel({image:fileName, hotelName, price, address})
        if(!uploadHotel){
            return res.json({error:"Could not upload new hotel", succes:false})
        }

        await uploadHotel.save()

        res.status(201).json({message:"New Hotel added successfully!", succes:true, uploadHotel})

   });


   
   

// use body-parser
app.use(bodyParser.urlencoded({extended:false}))

app.get('/', (req,res)=>{
    res.send("this app is running")
})

app.listen(port, async() => {
    console.log(`Server started on port ${port}`);
    await connectMongoose()
});