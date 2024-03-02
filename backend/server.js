import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app= express();

const PORT=process.env.PORT ||5000;

app.get("/",(req,res)=>{
    //root route 
    res.send("Hello World!!")
})

app.get("/api/auth/signup",(req,res)=>{
    console.log("signup route");
})

app.get("/api/auth/login",(req,res)=>{
    console.log("login route");
})

app.get("/api/auth/logout",(req,res)=>{
    console.log("logout route");
})
app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`)
})