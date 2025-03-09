import { verifyToken } from "../jwt/jwtHelper.js";
import { JWT_SECRET } from "../config/envConfig.js";

//  require sign middleware functionx
const requireSignin = async (req, res, next) => {
  try {
    // console.log(req.cookies);
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return res.status(409).json({ error: "Acess Denied" });
    }

    const payload = verifyToken(accessToken, JWT_SECRET);

    if (!payload) {
      return res.status(403).json({ error: "invalid token" });
    }

    req.user = payload;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid Token" });
  }
};

export default requireSignin;
