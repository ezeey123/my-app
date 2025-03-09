import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config();
mongoose
  .connect("mongodb://localhost:27017/express-auth")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });
// mongoose
//   .connect(process.env.DB)
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.log("Failed to connect to MongoDB", err);
//   });

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});

app.use("/users", userRouter); // this is the route for the userRouter
app.use("/auth", authRouter); // this is the route for the authRouter

// // Error handling middleware
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";
//   res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });
