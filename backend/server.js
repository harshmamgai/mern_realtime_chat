import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import connectToMongoDB  from './db/connectToMongoDB.js';
const PORT=process.env.PORT ||5000;

dotenv.config()
const app= express();
app.use(express.json()); //middleware to parse the incoming requests with JSON payloads (from req.body)
//created auth routes and added middleware
app.use("/api/auth",authRoutes);




app.get("/",(req,res)=>{
    //root route 
    res.send("Hello World!!")
})

app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server is running at port: ${PORT}`)
})