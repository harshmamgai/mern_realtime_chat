import Conversation from "../models/conversation.model.js";
import Message from "../models/messaage.model.js"
 export const sendMessage=async(req,res)=>{
  try{
const {message}=req.body;
const {id:recieverId}=req.params;
const senderId=req.user._id; // we are getting this senderId because we added protectedRoute middleware

console.log(message);
//now let's get the conversation b/w two users
let conversation =await Conversation.findOne({
    participants:{
        $all:[senderId,recieverId]
    },
})
if(!conversation){
    //users are sending message for the first time 
    conversation=await Conversation.create({
        participants:[senderId,recieverId],
    })
}

const newMessage=new Message({
    senderId,
    recieverId,
    message,
})


res.status(201).json({newMessage})
if(newMessage){
    //if new message got created then push the newly created message id's to conversation.messages array 
    conversation.messages.push(newMessage._id)

}
//SOCKET.io functionality to make app realtime

// await conversation.save();
// await newMessage.save(); //saving newly created message in database
await Promise.all([conversation.save(),newMessage.save()]);
  }
  catch(error){
    console.log(error.messaage)
    res.status(500).json({
        error:"Internal server error",
        error1:error.message
    })
  }
};

export const getMessages=async(req,res)=>{
try{
    console.log(req.params)
const {id:userToChatId}=req.params;
const senderId=req.user._id;
const conversation=await Conversation.findOne({
    participants:{$all:[senderId,userToChatId]},
}).populate("messages"); // as we know  messages in conversation only contain the message id not the
//content in order to see the content mongoose provides a method called populate

res.status(200).json(conversation.messages);
}
catch(error){
    console.log("error in getMessages controller", error.message);
    res.status(500).json({error:"Internal server error"});
}
}
