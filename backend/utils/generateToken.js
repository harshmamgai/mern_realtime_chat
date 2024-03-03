import jwt from 'jsonwebtoken'
const generateTokenAndSetCookie=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })

    //below  res.cookie() is used to set  the cookie in client side browser
    //first parameter is name of the cookie ,second  one is token value and third one is options for that particular cookie
    res.cookie("jwt",token,{
        maxAge:15*24*60*60*60*1000,//max age a cookie should live
        httpOnly:true, //prevent xss attacks cross-site scripting attacks
        sameSite:"strict",//CSRF attacks cross-site request forgery attacks
        secure:process.env.NODE_ENV!=='development',//only send over https if production
    })
}
export default generateTokenAndSetCookie;