const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[3,"UserName must be at lease 3 characters long"]

    },
    email :  {
        type:String,
        require:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[13,"email must be at lease 23 characters long"]
        
    },
    password:{
        type:String,
        require:true,
        trim:true,
        minlength:[3,"password must be at lease 5 characters long"]
        
    }
})
const user=mongoose.model('user',userSchema)

module.exports=user;