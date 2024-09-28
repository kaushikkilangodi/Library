const express = require('express');
const app=express();
app.use(express.json());//destrcturing user body
require("dotenv").config();
const dbconfig=require("./config/dbconfig");
const port= process.env.PORT || 5000;

const usersRoute=require('./routes/usersRoute');
const booksRoute=require('./routes/booksRoute');
const issuesRoute=require('./routes/issuesRoute');
const reportsRoute = require("./routes/reportsRoute");



app.use("/api/users",usersRoute);
app.use("/api/books",booksRoute);
app.use("/api/issues",issuesRoute);
app.use("/api/reports", reportsRoute);

const path =require("path");
__dirname=path.resolve();

if (process.env.NODE_ENV ==="production"){
    app.use(express.static(path.join(__dirname,"/client/build")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"));
    })
}

app.listen(port,()=> console.log(`Node server is started at ${port}`));