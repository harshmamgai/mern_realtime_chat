import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // we are  getting the token from cookies with the help of cookieParser module
    // console.log(token)
    if (!token) {
      return res.status(401).json({ error: "unauthorized-No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)

    if (!decoded) {
      return res.status(401).json({ error: "unauthorized - Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    console.log(user)

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectionRoute middleware=>", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;