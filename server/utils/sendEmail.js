import nodemailer from "nodemailer";

export const sendEmail = async ({ to, text, subject }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  });
  await transporter.sendMail({
    from: `ATS App ${process.env.SMTP_EMAIL}`,
    to,
    subject,
    text,
  });
};
