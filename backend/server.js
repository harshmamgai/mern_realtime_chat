import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import messageRoutes from './routes/message.routes.js';

import connectToMongoDB  from './db/connectToMongoDB.js';

const PORT=process.env.PORT ||5000;

dotenv.config()
const app= express();
app.use(cors({
    origin: 'http://localhost:3000',
  }));
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

app.get("/",(req,res)=>{
    //root route 
    res.send("Hello World!!")
})

app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server is running at port: ${PORT}`)
})