import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
    const [loading,setLoading]=useState(false);
    const {setAuthUser}=useAuthContext();
    // Logs out the user by deleting their token from local storage and redirecting them
    // to the login page.       
    const  logout=async()=>{
         setLoading(true)
         try{
const res=await fetch("/api/auth/logout",{
    method:"POST",
headers:{"Content-Type":"application/json"}
});
const data=res.json();
if(data.error){
    throw new Error(data.error);
}
localStorage.removeItem("token");
setAuthUser(null);
toast.success("Logged Out!");
         }
         catch(error){
            toast.error(error);
         }
         finally{
setLoading(false);
         }
  }
  return {logout, loading};
};
export default useLogout;