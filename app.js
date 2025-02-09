const express=require("express");
const userRouter=require("./routes/user.routes.js") // import router
const indexRouter=require("./routes/index.routes")  // import index page
// require("dotenv").config();
const dotenv=require('dotenv').config();
const connectToDB=require("./config/db")
// connectToDB.connectToDB();
connectToDB()
const cookieParser=require("cookie-parser"); // require cookie-parser for cookies and session
const app=express();

app.set("view engine","ejs");
app.use(express.json())//middle ware
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())//middle ware
app.use("/user",userRouter)
app.use("/",indexRouter)



app.listen(2000,()=>{
    console.log("Server is running on port 2000");
})