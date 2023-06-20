const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());



app.get("/" , (req , res)=>{
    res.send("This is Running's server")
})

app.listen(port , ()=>{
    console.log(`This server is running at port ${port}`);
})