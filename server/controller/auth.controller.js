import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
// import { errorHandler } from "../utills/error.js";

// The code above defines a signup function that creates a new user in the database. The function first checks if the required fields are provided in the request body. If any field is missing or empty, it returns a 400 status code with a message. If all fields are provided, the function hashes the password using bcryptjs, creates a new user object, and saves it to the database. If there is an error during the save operation, the function calls the error handling middleware with the error.
import { generateToken, verifyToken } from "../jwt/jwtHelper.js";

import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
  JWT_SECRET,
} from "../config/envConfig.js";

console.log(ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN, JWT_SECRET);

// user login controller function
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userWithEmailExist = await User.findOne({ email });

    if (!userWithEmailExist) {
      return res.status(400).json({ error: "user with email does not exist " });
    }

    if (!userWithEmailExist.isVerified) {
      return res.status(403).json({ error: "user account is not verified" });
    }

    // for the password match with the user password in the database
    const passwordMatch = await bcryptjs.compareSync(
      password,
      userWithEmailExist?.password
    );

    if (!passwordMatch) {
      return res.status(403).json({ error: "invalid login credentials" });
    }

    const jwtPayload = {
      email: userWithEmailExist.email,
      userId: userWithEmailExist._id,
      firstName: userWithEmailExist.firstName,
      lastName: userWithEmailExist.lastName,
    };
    // generate refresh token
    const refreshToken = generateToken(
      jwtPayload,
      JWT_SECRET,
      REFRESH_TOKEN_EXPIRES_IN
    );

    // generate acess token
    const accessToken = generateToken(
      jwtPayload,
      JWT_SECRET,
      ACCESS_TOKEN_EXPIRES_IN
    );
    // cookie option
    const cookieOption = {
      expires: new Date(Date.now() + 3600),
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOption)
      .json({ message: "user login succesfully", refreshToken });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

//  logout user controller function

const logOutUser = async (req, res) => {
  try {
    res
      .clearCookie("accessToken")
      .status(200)
      .json({ message: "user logout succesfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

const generateAcessToken = async (req, res) => {
  try {
    const refreshToken = req.headers["authorization"];

    if (!refreshToken) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    if (refreshToken.split(" ")[0] !== "Bearer") {
      return res.status(403).json({ error: "Invalid token" });
    }

    const payload = verifyToken(refreshToken.split(" ")[1], JWT_SECRET);
    if (!payload) {
      return res.status(403).json({ error: "Invalid Token" });
    }

    //  new access token payload
    const jwtPayload = {
      userId: payload.userId,
      firstName: payload.firstName,
      lastName: payload.lastName,
    };
    const accessToken = generateToken(
      jwtPayload,
      JWT_SECRET,
      ACCESS_TOKEN_EXPIRES_IN
    );
    // cookie option
    const cookieOption = {
      expires: new Date(Date.now() + 3600),
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOption)
      .json({ message: "sucessfull" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

export { loginUser, logOutUser, generateAcessToken };
// The code above defines a login function that logs in a user. The function first checks if a user with the provided email exists in the database. If the user does not exist, it returns a 400 status code with a message. If the user exists but is not verified, it returns a 403 status code with a message. If the user exists and is verified, the function compares the provided password with the user's hashed password. If the passwords do not match, it returns a 403 status code with a message. If the passwords match, the function generates an access token and a refresh token using the generateToken function from the jwtHelper module. It then sets the access token as a cookie in the response and returns a 200 status code with a message and the refresh token.
