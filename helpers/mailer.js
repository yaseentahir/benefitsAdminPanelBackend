const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config(path.resolve(__dirname, ".env"));

const transporter = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASSWORD,
  },
  // requireTLS: true,
  // tls: {
  //   rejectUnauthorized: false,
  // },
});
module.exports = transporter;
