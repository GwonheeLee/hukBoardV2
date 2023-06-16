import { config } from "@/lib/config";
import nodemailer from "nodemailer";

export const sendMail = async (to: string, code: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: config.gmail.user,
      pass: config.gmail.pass,
    },
  });

  await transporter.sendMail({
    from: config.gmail.user,
    to: to,
    subject: "Huk-Board Login",
    html: html(code),
  });

  return code;
};

function html(logincode: string) {
  return `
  <body>
    <div
      style="
        background-color: #f2f2f2;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        width: 300px;
        margin: 0 auto;
        text-align: center;
      "
    >
      <strong>Login Code</strong>
      <h2>${logincode}</h2>
    </div>
  </body>
  `;
}
