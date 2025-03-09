import express from "express";
// import { signup } from "../controller/auth.controller.js";
import {
  logOutUser,
  loginUser,
  generateAcessToken,
} from "../controller/auth.controller.js";
import requireSignin from "../middleware/requireSignin.js";

const authRouter = express.Router();

// authRouter.post("/signup", signup);
authRouter.post("/login", loginUser);
authRouter.get("/logout", requireSignin, logOutUser);
authRouter.get("/token", generateAcessToken);

export default authRouter;
// The code above creates a router that listens for POST requests to /signup. When a request is made, the server responds with "API is working".
// The code above creates a router that listens for POST requests to /login. When a request is made, the server responds with "API is working".
