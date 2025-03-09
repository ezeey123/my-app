import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { generateOtp } from "../token/generateToken.js";

// create new user function
const createNewUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({ error: "user with email already exists" });
    }

    //  create new user
    // generate otp || verification token
    const verificationToken = generateOtp();
    // hash the password of the user
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    let currentDate = new Date();

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresIn: currentDate.setHours(
        currentDate.getHours() + 1
      ),
    });

    await newUser.save();

    if (!newUser) {
      return res.status(400).json({ error: "user creation falied" });
    }

    return res
      .status(201)
      .json({ message: "user creation sucessful", newUser });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// verify user contoller function
const verifyUser = async (req, res) => {
  const { verificationToken } = req.body;

  try {
    const userExistsForVerification = await User.findOne({ verificationToken });
    if (!userExistsForVerification) {
      return res.status(404).json({ error: "Invalid verification token" });
    }

    // expiration time for the token
    if (
      new Date() - userExistsForVerification?.verificationTokenExpiresIn >=
      60 * 60 * 1000
    ) {
      await User.findByIdAndDelete(userExistsForVerification._id.toString());
      return res.status(403).json({ error: "expired verification token" });
    }

    userExistsForVerification.verificationToken = undefined;
    userExistsForVerification.verificationTokenExpiresIn = undefined;
    userExistsForVerification.isVerified = true; // After the used is verified , the verification token becomes undefined(deleted)
    // so does the time and is verified is true

    await userExistsForVerification.save();

    return res.status(200).json({ message: "user verified sucessfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// get current user information
const getCurrentUser = async (req, res) => {
  const { userId } = req.user;
  try {
    const currentUser = await User.findById(userId).select("-password");
    if (!currentUser) {
      return res.status(404).json({ error: "user not found" });
    }

    return res.status(200).json({ user: currentUser });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

export { createNewUser, verifyUser, getCurrentUser };
