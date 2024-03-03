import User from "../models/user.model.js";

export const getUsersForSideBar=async(req,res)=>{
    try{
//let's get id of currently logged in user
const loggedInUserId=req.user._id;// we are getting this senderId because we added protectedRoute middleware, and we set req.user=user 
//where we fetched user from database after applying query
console.log("currently logged in user",req.user._id)
//let's fetch all users from the database
const filterdUsers=await User.find({_id:{ $ne: loggedInUserId }}).select("-password"); //fetch all the users  except current logged-in user
//we excluded this user as in sidebar we don't want to show ourself in logged in user list instead we want to see other users. 
res.status(200).json({ filterdUsers});
}
    catch(error){
        console.log("Error in getUsersForSideBar:", error.message)
        res.status(500).json({
            error:"internal serrver error"
        })
    }
}