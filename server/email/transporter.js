import nodemailer from "nodemailer";
import { google } from "googleapis";
import envVariables from "../config/smtpConfig.js";

const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, USER_EMAIL } = envVariables;

const OAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const accessToken = OAuth2Client.getAccessToken();

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: USER_EMAIL,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: accessToken,
  },
});

export default transport;
