const cloudinary = require('cloudinary').v2;
// require("env").config()

cloudinary.config({
    cloud_name: process.env.cloud_name_cloudinary,
    api_key: process.env.api_key_cloudinary,
    api_secret: process.env.api_secret_cloudinary
  });
  
  module.exports = cloudinary