  const mongoose = require("mongoose")
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
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:true
    }
})

const hotelModel = new mongoose.model('createHotel', hotelSchema );

module.exports = hotelModel;
