import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

try {
  await transporter.verify();
  console.log("Server is ready to take our messages");
} catch (err) {
  console.error("Verification failed:", err);
}

export const sendEmail = async (
  to: string,
  subject: string,
  html: string,
  text: string,
) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject,
    html,
    text,
  };

  try {
    const details = await transporter.sendMail(mailOptions);
    console.log("Email sent:", details);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
