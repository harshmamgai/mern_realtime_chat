import { useContext, useState } from "react";
import { createContext } from "react";

export const AuthContext=createContext();
export const useAuthContext=()=>{
    return useContext(AuthContext);
}
export  const AuthContextProvider = ({children}) =>{
    const [authUser, setAuthUser]=useState(localStorage.getItem("chat-app")||null);
    //state to hold the user info and  
    return <AuthContext.Provider value={{authUser,setAuthUser}}>
    {children}
    </AuthContext.Provider>
};
//in  this we are using local storage to store our data , if any one try to access the app without login it will show null .
//value is an object that contains two properties: authUser & setAuthUser
/*
* authUser : holds the current authenticated                
user's data (if any) in JSON format. This property will be null if there is no currently logged in user.
* setAuthUser : a function used for updating the authUser state. It accepts one argument - the new value of authUser.
* setAuthUser : function used for updating the state of authUser . It takes one argument which should be a new value for authUser.
* UseAuthContext will be used to consume the value set authUser or SetAuthUser

AuthContextProvider will make values available through out the application 

*/