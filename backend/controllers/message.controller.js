 export const sendMessage=async(req,res)=>{
  try{
const {message}=req.body;
const {id}=req.params;
  }
  catch(error){
    res.status(500).json({
        error:"Internal server error"
    })
  }
};
