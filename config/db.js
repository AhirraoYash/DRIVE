const mongoose=require('mongoose');
function connectToDB(){
    //mongoose.connect(process.env.MONGE_URI).then(()...)
    mongoose.connect("mongodb://0.0.0.0/men-drive").then(()=>{
        console.log("Connecte to DB");
    })
}
module.exports=connectToDB;