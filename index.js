const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressFileUpload = require('express-fileupload');
const { connectMongoose } = require('./db/connectDb');
const hotelModel = require('./models/Hotel'); 
const { router } = require('./route/user'); 
const app = express();
const port = 1000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressFileUpload());

// Routes
app.use('/', router);

app.get('/', (req, res) => {
    res.send("This app is running");
});

// Start server and connect to the database
app.listen(port, async () => {
    console.log(`app is running on port ${port}`)
    await connectMongoose()
});
