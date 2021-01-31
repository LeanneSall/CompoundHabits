const { decodeBase64 } = require('bcryptjs');
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
//initialize express
const app = express();
// connect to database
connectDB();

app.use(express.json({ extended: false }))
//Home page
app.get('/', (req, res) => {
    res.send('API IS RUNNING')
})
//connect to routes folder 
app.use('/register', require('./routes/users'))
app.use('/habits', require('./routes/habits'))



//Port here
const PORT = process.env.PORT || 5000;

//listen on port
app.listen(PORT, () => {
    console.log(`Server Started on port: ${PORT}`)
})