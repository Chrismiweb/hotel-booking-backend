const express = require('express');
const port =1000
//  multer is used to upload files in node js
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const app  = express()
const bodyParser = require('body-parser')
const expressFilUpload = require('express-fileupload');
const connectMongoose = require('./db/connectDb');
const hotelModel = require('./models/Hotel');

// use express
app.use(express.json())

// use express file upload
app.use(expressFilUpload());

// use body-parser
app.use(bodyParser.urlencoded({extended:false}))

app.get('/', (req,res)=>{
    res.send("this app is running")
})


  
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

   
    // to get all available hotels
   app.get('/api/v1/getAllHotel', async(req, res)=>{
        const getAllHotel = await hotelModel.find()

        if(!getAllHotel) {
            res.status(404).json({error: "hotel not found"})
        }
        res.json({getAllHotel})
   })

    // to get individual hotel using the hotel Name
    app.get('/api/v1/oneHotel/:hotelName' , async(req,res)=>{
        const {hotelName} = req.params
        const findHotel = await hotelModel.findOne({hotelName})

        if(!findHotel){
            res.status(404).json({error: "the hotel you are finding is not available"})
        }
        res.json({findHotel})
    })

    // to delete individual hotel using hotel name 
    app.delete('/api/v1/deleteOneHotel/:hotelName', async(req,res)=>{
        const {hotelName} = req.params
        const findHotel = await hotelModel.findOneAndDelete({hotelName})
        if(!findHotel){
           return res.status(404).json({error: "the hotel you want to delete is not available"})
        }
        res.json({message: "hotel was deleted successfully"})
    })

    // to update a hotel detail
    app.patch('/api/v1/updateHotel/:hotelName', async(req,res)=>{
        const {hotelName} = req.params
        const updateHotel  = await hotelModel.findOneAndUpdate({hotelName}, req.body, {runValidator: true, new:true})
        if(!updateHotel){
            res.status(404).json({error: "the hotel detail you want to update was not found"}, req.body, {runValidator: true, new:true})
        }
        res.json({message : "hotel details was updated succesfully"})
    })
   
   


app.listen(port, async() => {
    console.log(`Server started on port ${port}`);
    await connectMongoose()
});