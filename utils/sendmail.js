import nodemailer from "nodemailer";
import config from "../config/config.js";
import "dotenv/config";

export const sendEmail = async ({ email, subject, message }) => {
  console.log({ email, subject, message });
  const transport = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    auth: {
      user: config.SMTP_USERNAME,
      pass: config.SMTP_PASSWORD,
    },
  });
  console.log({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      auth: {
          user: config.SMTP_USERNAME,
          pass: config.SMTP_PASSWORD,
      }
  })
  //sending mail with defined transport object
  const sendEmailMessage = {
    //sender email
    from: `${config.NAME} <${config.FROM_EMAIL}>`,
    //reciver email
    to: email,
    //email sybject
    subject: subject,
    //html code format for email
    html: `<b>${message}</b>`,
  };

  //sending mail with defined transport object

  const info = await transport.sendMail(sendEmailMessage);
  console.log("Sent message", info.messageId);
};
