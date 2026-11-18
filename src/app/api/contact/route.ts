import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// お問い合わせフォームの送信先。
// ・サロン向けの /contact（fetch で送信、JSON で結果を返す）
// ・転職版の /career（ふつうのフォーム送信、完了ページへ転送）
// の両方から使う。

const LIMITS = {
  name: 100,
  salon: 100,
  email: 254,
  service: 50,
  url: 500,
  message: 5000,
};

const SERVICES = ["ホームページ制作", "LP（1ページ）制作", "WordPressの修正", "その他・まだ決まっていない"];

function field(formData: FormData, key: keyof typeof LIMITS) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, LIMITS[key]) : "";
}

export async function POST(req: Request) {
  const wantsJson = req.headers.get("x-requested-with") === "fetch";

  const fail = (status: number, error: string) =>
    wantsJson
      ? NextResponse.json({ ok: false, error }, { status })
      : NextResponse.json({ success: false, error }, { status });

  try {
    const formData = await req.formData();

    // ボット対策：人には見えない入力欄に何か入っていたら、送ったふりをして終わる
    const trap = formData.get("company_website");
    if (typeof trap === "string" && trap !== "") {
      return wantsJson
        ? NextResponse.json({ ok: true })
        : NextResponse.redirect(new URL("/contact/thanks", req.url), { status: 303 });
    }

    const name = field(formData, "name");
    const salon = field(formData, "salon");
    const email = field(formData, "email");
    const serviceRaw = field(formData, "service");
    const service = SERVICES.includes(serviceRaw) ? serviceRaw : "";
    const url = field(formData, "url");
    const message = field(formData, "message");

    if (!name || !email || !message) {
      return fail(400, "お名前・メールアドレス・ご相談内容を入力してください。");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return fail(400, "メールアドレスの形式が正しくありません。");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const lines = [
      `お名前：${name}`,
      salon && `サロン名：${salon}`,
      `メール：${email}`,
      service && `ご相談内容：${service}`,
      url && `今のサイト：${url}`,
      "",
      message,
    ].filter((line) => line !== "");

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `【お問い合わせ】${service || "ご相談"}｜${salon || name}`,
      text: lines.join("\n"),
    });

    return wantsJson
      ? NextResponse.json({ ok: true })
      : NextResponse.redirect(new URL("/contact/thanks", req.url), { status: 303 });
  } catch (error: unknown) {
    console.error("メール送信エラー:", error);
    return fail(500, "送信できませんでした。時間をおいて、もう一度お試しください。");
  }
}
