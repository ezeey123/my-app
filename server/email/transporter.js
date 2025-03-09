// import nodemailer from "nodemailer";
// import { google } from "googleapis";
// import dotenv from "dotenv";
// import {
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REFRESH_TOKEN,
//   USER_EMAIL,
// } from "../config/smtpConfig.js";

// dotenv.config(); // Load environment variables

// // Set up the OAuth2 client
// const OAuth2 = google.auth.OAuth2;
// const OAuth2Client = new OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   "https://developers.google.com/oauthplayground"
// );

// OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// // Create a transporter for nodemailer using OAuth2
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: USER_EMAIL,
//     clientId: CLIENT_ID,
//     clientSecret: CLIENT_SECRET,
//     refreshToken: REFRESH_TOKEN,
//   },
// });

// export { transporter };
