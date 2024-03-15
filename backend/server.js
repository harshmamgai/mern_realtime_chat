import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import messageRoutes from './routes/message.routes.js';
import {app,server } from './socket/socket.js';
import path from 'path';
import connectToMongoDB  from './db/connectToMongoDB.js';

const __dirname=path.resolve();
const PORT=process.env.PORT ||5000;
dotenv.config()
app.use(express.json()); //middleware to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());
//adding cookieParser middleware before using any of the routes so that we can use cookies
//as we need cookies for the protection routes to read token


app.use("/api/auth",authRoutes);//created auth routes and added middleware

/*
we were not able to read req.body because i maintianed app.use(express.json()) middleware after app.use("/api/auth",authRoutes) router middleware so while we 
 were navigating to localhost://5000/api/login and were doing post request and passing data like {
    "name":"harsh"
 }
 as we don't have json parser so  we need to use this middleware which will convert as we used that after router middleware so 
 node js /express won't able to read the req body we were sending
*/
app.use("/api/messaages",messageRoutes);


//now creating user routes
app.use("/api/users",userRoutes);



app.use(express.static(path.join(__dirname,"/frontend/dist"))) 
//dist will be created once we build our application 

// app.get("/",(req,res)=>{
//     //root route 
//     res.send("Hello World!!")
// })

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})


server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server is running at port: ${PORT}`)
})