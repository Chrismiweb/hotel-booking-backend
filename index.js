const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');
const expressFileUpload = require('express-fileupload');
const { connectMongoose } = require('./db/connectDb');
const hotelModel = require('./models/Hotel'); 
const { router } = require('./route/hotel.route'); 
// const { cloudinary_js_config } = require('./utils/cloudinary');
// const { routers } = require('./route/user.route');
const app = express();
const port = 1000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressFileUpload());

app.use(cors())
// Routes
app.use('/', router);
// app.use('/', routers);

// use cors

// const corsOptions = {
//     origin: '*',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }


app.get('/', (req, res) => {
    res.send("This app is running");
});

// Start server and connect to the database
app.listen(port, async () => {
    console.log(`app is running on port ${port}`)
    await connectMongoose()
});
