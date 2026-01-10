const express = require('express');

const app = express();

// global middlewares
app.use(express.json());


const routes= require("./routes");

app.use("/api/v1", routes)
// test route
app.get('/', (req,res) =>{
    res.send("Server running")
});


module.exports= app;