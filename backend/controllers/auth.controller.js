export const Signup=async (req,res)=>{
    try{
  const {fullname,username,password,confirmPasswrod,gender}=req.body;
    }
    catch(err){
        console.log(error)
    }
}

export const Login=(req,res)=>{
    res.send("login user");
    console.log("Login User");
}

export const Logout=(req,res)=>{
    res.send("logout user");
    console.log("Logout User");
}