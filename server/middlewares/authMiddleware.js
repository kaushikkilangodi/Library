const jwt=require("jsonwebtoken");
// const { estimatedDocumentCount } = require("../models/usersModel");

module.exports=function(req,res,next){
    try {
        const token=req.headers.authorization.split(" ")[1];
        const decoded= jwt.verify(token,process.env.jwt_secret);
        if(decoded.userId){
            req.body.userIdFromToken =decoded.userId;
            next(); 
        }
        else{
            return res.send({
                success:false,
                message:"Invalid Token",
            });
        }
    } catch (error) {
        return res.send({
            success:false,
            message:error.message,
        })
    }
}