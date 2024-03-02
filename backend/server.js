import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'

dotenv.config()
const app= express();

const PORT=process.env.PORT ||5000;

app.get("/",(req,res)=>{
    //root route 
    res.send("Hello World!!")
})

app.use("/api/auth",authRoutes);

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`)
})