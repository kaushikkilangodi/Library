const express = require('express');
const app=express();
app.use(express.json());//destrcturing user body
require("dotenv").config();
const dbconfig=require("./config/dbconfig");
const port= process.env.PORT || 5000;

const usersRoute=require('./routes/usersRoute');

app.use("/api/users",usersRoute);

app.listen(port,()=> console.log(`Node server is started at ${port}`));