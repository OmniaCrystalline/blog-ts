/** @format */

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationMail = (props: { userEmail: string; pass: string }) =>
  transporter.sendMail(
    {
      from: process.env.EMAIL,
      to: props.userEmail,
      subject: "verif",
      text: `follow plz this link ${'http://localhost:3000/verification/1'} to finish registration`
    },
    (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
