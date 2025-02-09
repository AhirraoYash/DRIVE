const express=require("express");
// const { modelName } = require("../models/user.model")
const router=express.Router();



router.get('/home',(req,res)=>{
    res.render("home");
})





module.exports=router