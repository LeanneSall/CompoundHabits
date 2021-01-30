const { decodeBase64 } = require('bcryptjs');
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
//initialize express
const app = express();
// connect to database
connectDB();
//connect to routes folder 

//Port here
const PORT = process.env.PORT || 5000;

//listen on port
app.listen(PORT, () => {
    console.log(`Server Started on port: ${PORT}`)
})