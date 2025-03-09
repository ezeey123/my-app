import express from "express";
// import { test } from "../controller/user.controller.js";
import {
  createNewUser,
  verifyUser,
  getCurrentUser,
} from "../controller/user.controller.js";
import requireSignin from "../middleware/requireSignin.js";
const userRouter = express.Router();

userRouter.post("/", createNewUser);
userRouter.put("/verify", verifyUser);
userRouter.get("/me", requireSignin, getCurrentUser);

export default userRouter;
// The code above creates a router that listens for GET requests to /test. When a request is made, the server responds with "API is working".
