const mongoose= require('mongoose');

mongoose.connect(process.env.mongo_url)

const connection = mongoose.connection;

connection.on('connected',()=>{
    console.log('Mongo db connection succcesfull');
})
connection.on("error",(err)=>{
    console.log('Mongo db connection failed');
})

module.exports=connection;