const express = require('express');
const connectDB = require('./config/db');

connectDB();

const app = express();

// mapping to main
app.get('/', (req, res)=>{res.send('API is running')});

// get deployment port or default
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{console.log(`Server started on port: ${PORT}`)});