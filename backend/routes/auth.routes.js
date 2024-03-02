import express from 'express'
const router= express.Router()

router.get("/login",(req,res)=>{
    res.send("Login route");
})

router.get("/signup",(req,res)=>{
    res.send("Signup route");
})

export default router;