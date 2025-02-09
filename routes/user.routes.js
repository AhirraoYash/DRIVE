const express = require("express");
const router = express.Router();
const { body,validationResult } = require('express-validator'); // ✅ Correct spelling
const userModel=require('../models/user.model')
const bcrypt=require('bcrypt'); //npm i bcrypt
const jwt=require("jsonwebtoken") //npm i jsonwebtoken
 
 //validataion from website

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register",
    body('email').trim().isEmail().isLength({min:13}),
    body('username').trim().isLength({min:5}),
    body('password').trim().isLength({min:3}),

    async (req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array(),
            message:'Invalid Data na bhai'
        })
    }
    // res.send(errors)
    const {email,username,password}=req.body;
    const hashPassword=await bcrypt.hash(password,10) // 10 is hashing how many round, it balance number
    const newUser=await userModel.create({
        email,
        username,
        password:hashPassword  
    })
    res.json(newUser)
    // res.send(newUser)
});


router.get('/login',(req,res)=>{
    res.render('login');
})

router.post('/login',
    body("email").trim().isEmail().isLength({min:13}),
    body("password").trim().isLength({min:3}),
    async (req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message:"Invalid data"
            })
        }
        const {email,password}=req.body;
        const user=await userModel.findOne({
            email:email,
        })
        if(!user){
            return res.status(400).json({
                messaage:"User name or password is Incorrect"
            })
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({
                message:"Username or password is incorrect"
            })
        }

        // npm i jsonwebtoken
        const token=jwt.sign({
            userId:user._id,
            email:user.email,
            name:user.username
        },
        process.env.JWT_SECRET
    )
         res.cookie("token",token)
         res.send("logged in")

    }
)
module.exports = router;
