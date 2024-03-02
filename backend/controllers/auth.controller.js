import User from '../models/user.model.js';
import bcrypt from 'bcryptjs'
import express from 'express';

// No need to create a new express app here
// Remove: const app = express();

// Use bodyParser to parse JSON in the request body
const bodyParser = express.json();
export const Signup = async (req, res) => {
    try {
     const {fullName,username,password,confirmPassword,gender}=req.body;
     console.log(req.body)
  if(password!==confirmPassword){
    return res.status(400).json({error:"Password does not match"});
  }
    const user = await User.findOne({username})
    if(user){
return res.status(400).json({error:"Username already exists"});
    }
    
    //Hash password here
    const salt =await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt)

    //to get random image
    const boyProfilePic= `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic= `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser= new User({
        fullName,
        username,
        password:hashedPassword,
        gender,
        profilePic: gender=="male"? boyProfilePic: girlProfilePic,
    })

    if(newUser){

        //generate jwt Token here
    await newUser.save();
    res.status(201).json({
        _id:newUser._id,
        fullName:newUser.fullName,
        username:newUser.username,
        profilePic:newUser.profilePic
    })
}
 
    else{
        res.status(400).json({error:"Invalid user data"});
    }
}
catch(err){
res.status(500).json({error:err.message})
}



};

export const Login = (req, res) => {
    res.send("Logout user");
    console.log("Logout User");
};

export const Logout = (req, res) => {
    res.send("Logout user");
    console.log("Logout User");
};

// No need to listen to a port here
// Remove: const port = 3000; app.listen(port, () => { console.log(`Server is running on port ${port}`); });
