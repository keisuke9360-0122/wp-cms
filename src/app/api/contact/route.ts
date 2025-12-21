import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
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

    // ✅ 303 リダイレクトで GET に変換して遷移
    return NextResponse.redirect(new URL("/contact/thanks", req.url), {
      status: 303,
    });
  } catch (error: any) {
    console.error("メール送信エラー:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
