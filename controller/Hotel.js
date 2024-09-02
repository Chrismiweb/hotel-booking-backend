const hotelModel = require("../models/Hotel");
const fileUpload = require("express-fileupload");
const express = require("express")
const app = express();
const path= require('path')
const fs= require('fs')

// default options
app.use(fileUpload());
// conver to json
app.use(express.json())



// directory
// app.use('/uploads', express.static(__dirname, 'uploads'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


    // create hotel
    const createHotel = async(req,res)=>{ 
        try {
            const {hotelName, price, address} = req.body

        if(!hotelName || !price || !address){
            return res.json({error: "Please upload all credential"})
        }
        
      // Check if files were uploaded
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
  
      console.log('req.files >>>', req.files); 
  
      const hotelFile = req.files.image;
      const uploadsDir = path.join(__dirname, '../uploads/');
  
      // Create the uploads directory if it doesn't exist
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
      }
  
      // Generate a unique filename using Date.now()
      const fileName = `${Date.now()}-${hotelFile.name}`;
      const uploadPath = path.join(uploadsDir, fileName);
  
      // Move the file to the upload directory
      hotelFile.mv(uploadPath, (err) => {
        if (err) {
          return res.status(500).send(err);
        }
      });
  

        const uploadHotel = new hotelModel({
            image:fileName, 
            hotelName, 
            price, 
            address
        })
        if(!uploadHotel){
            return res.json({error:"Could not upload new hotel", succes:false})
        }

        await uploadHotel.save()
        
        res.status(201).json({message:"New Hotel added successfully!", succes:true, uploadHotel})
        } catch (error) {
            console.log(error.message);
               
        }

   };
   
   
    // to get all available hotels
   const getAllHotels = async(req, res)=>{
        const getAllHotel = await hotelModel.find()

        if(!getAllHotel) {
            res.status(404).json({error: "hotel not found"})
        }
        res.json({getAllHotel})
   }

 // to get individual hotel using the hotel Name
    const getOneHotel = async(req, res)=>{
        const {hotelName} = req.params
        const findHotel = await hotelModel.findOne({hotelName})

        if(!findHotel){
            res.status(404).json({error: "the hotel you are finding is not available"})
        }
        res.json({findHotel})
    }

    // to delete individual hotel using hotel name 
    const deleteOneHotel = async(req,res)=>{
        const {hotelName} = req.params
        const findHotel = await hotelModel.findOneAndDelete({hotelName})
        if(!findHotel){
           return res.status(404).json({error: "the hotel you want to delete is not available"})
        }
        res.json({message: "hotel was deleted successfully"})
    }

    // delete all uploaded hotels
    const deleteAllHotels = async(req, res)=>{
        const deleteHotel = await hotelModel.deleteMany()
        if(!deleteHotel){
            return res.status(404).json("unable to delete because no available hotel")
        }
        res.status(200).json({message: "all uploaded hotels were deleted succesfully", deleteHotel})

    }


    // to update a hotel detail
    const updateHotel = async(req,res)=>{
        const {hotelName} = req.params
        const updateHotel  = await hotelModel.findOneAndUpdate({hotelName}, req.body, {runValidator: true, new:true})
        if(!updateHotel){
            res.status(404).json({error: "the hotel detail you want to update was not found"}, req.body, {runValidator: true, new:true})
        }
        res.json({message : "hotel details was updated succesfully", updateHotel})
    }
   


    module.exports = {
        createHotel,
        getOneHotel,
        getAllHotels,
        deleteOneHotel,
        updateHotel, 
        deleteAllHotels
    }