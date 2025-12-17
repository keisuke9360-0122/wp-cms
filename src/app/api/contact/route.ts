import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const formData = await req.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: process.env.MAIL_TO,
    subject: `お問い合わせ: ${name}`,
    text: `送信者: ${email}\n\n${message}`,
  });

  return NextResponse.json({ success: true });
}
