const express = require('express');

const app = express();

// global middlewares
app.use(express.json());

// test route
app.get('/', (req,res) =>{
    res.send("Server running")
});


module.exports= app;