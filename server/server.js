const express = require('express');
const app=express();
app.use(express.json());//destrcturing user body
require("dotenv").config();
const dbconfig=require("./config/dbconfig");
const port= process.env.PORT || 5000;

const usersRoute=require('./routes/usersRoute');
const booksRoute=require('./routes/booksRoute');
const issuesRoute=require('./routes/issuesRoute');


app.use("/api/users",usersRoute);
app.use("/api/books",booksRoute);
app.use("/api/issues",issuesRoute);
app.listen(port,()=> console.log(`Node server is started at ${port}`));