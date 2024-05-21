const express = require('express');

const router = express.Router()

const User = require('../models/usersModel');

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const authMiddleware =require("../middlewares/authMiddleware")

// register a new user

router.post('/register', async (req, res) => {
    try {
        ///check if user is already exists
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.send(
                {
                    success: false,
                    message: 'Email already exist',
                }
            );
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        //create a new user
        const newUser = new User(req.body);
        await newUser.save();
        return res.send({
            success: true,
            message: 'user created successfully, Please login',
        });

    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
});

//login a user
router.post('/login', async (req, res) => {
    try {
        //checking if user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                success: false,
                message: 'User doesnt exist',
            });
        }//checking if password is  ccorrect
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password

        )
        if (!validPassword) {
            return res.send({
                success: false,
                message: 'invalid password',
            });
        }
        //create and assign token
        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, { expiresIn: '365d' });//._id
        return res.send({
            success: true,
            message: ' Login succesfull',
            data: token
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,

        });

    }
})

//get logged in users details
router.get("/get-logged-in-user",authMiddleware, async (req,res)=>{
    try {
            const user= await User.findById(req.body.userIdFromToken);
            if(!user){
                    return res.send({
                        success:false,
                        message:"user does not exist",
                    })
            }
            return res.send({
                success:true,
                message:"user details fetched successfully",
                data:user,
            });
        
    } catch (error) {
        return res.send({
            success:false,
            message:error.message,
        });
        
    }
});

//get all the users(patrons)
router.get("/get-all-users/:role",authMiddleware,async(req,res)=>{
    try {
        const users =await User.find({role:req.params.role});
        return res.send({
            success:true,
            message:"Users fetched successfully",
            data:users,
        });
    } catch (error) {
        return res.send({
            success:false,
            message:error.message,
        });
        
    }
});

//get userby id
router.get("/get-user-by-id/:id",authMiddleware,async(req,res)=>{
    try {
      const user=await User.findById(req.params.id);
      if(!user){
        return res.send({
            success:false,
            message:"User does not exist",
        });
      }  
      return res.send({
        success:true,
        message:"User fetched Successfully",
        data:user,
      });
    } catch (error) {
        return res.send({
            success:false,
            message:'User does not exist',

        });
        
    }
})
module.exports = router;