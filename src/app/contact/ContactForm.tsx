"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SERVICES = [
  "ホームページ制作",
  "LP（1ページ）制作",
  "WordPressの修正",
  "その他・まだ決まっていない",
];

type Status = "idle" | "sending" | "error";

const inputClass =
  "w-full border-0 border-b border-[#CFCFCB] bg-transparent px-0 py-3 text-base text-ink outline-none transition-colors placeholder:text-[#9A9A96] focus:border-ink";

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="flex items-center gap-2 text-sm font-medium">
      {children}
      {required ? (
        <span className="font-en text-[11px] font-medium uppercase tracking-[0.04em] text-sub">Required</span>
      ) : (
        <span className="font-en text-[11px] font-medium uppercase tracking-[0.04em] text-[#9A9A96]">Optional</span>
      )}
    </label>
  );
}

export default function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "x-requested-with": "fetch" },
        body: new FormData(e.currentTarget),
      });
      const data: { ok?: boolean; error?: string } = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "送信できませんでした。時間をおいて、もう一度お試しください。");
      }
      router.push("/contact/thanks");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "送信できませんでした。");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <Label htmlFor="name" required>
            お名前
          </Label>
          <input id="name" name="name" type="text" required maxLength={100} autoComplete="name" className={inputClass} />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="salon">サロン名</Label>
          <input id="salon" name="salon" type="text" maxLength={100} autoComplete="organization" className={inputClass} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="email" required>
          メールアドレス
        </Label>
        <input id="email" name="email" type="email" required maxLength={254} autoComplete="email" className={inputClass} />
      </div>

      <fieldset className="flex flex-col gap-4">
        <legend className="mb-4 flex items-center gap-2 text-sm font-medium">
          ご相談内容
          <span className="font-en text-[11px] font-medium uppercase tracking-[0.04em] text-[#9A9A96]">Optional</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((service) => (
            <label key={service} className="choice-pill">
              <input type="radio" name="service" value={service} className="sr-only" />
              <span>{service}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-1">
        <Label htmlFor="url">今のホームページのURL</Label>
        <input id="url" name="url" type="url" maxLength={500} placeholder="https://" className={inputClass} />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="message" required>
          ご相談の詳細
        </Label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={5000}
          rows={6}
          placeholder="例）ホットペッパーの予約ボタンを置いた、シンプルなホームページを作りたい"
          className={`${inputClass} resize-y leading-[1.9]`}
        />
      </div>

      {/* ボット対策：人には見えない入力欄 */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website">この欄は空のままにしてください</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-6 border-t border-ink pt-8 md:flex-row md:items-center md:justify-between">
        <p className="text-[13px] leading-[1.9] text-sub">
          送信いただいた内容は、
          <Link href="/privacy" className="underline underline-offset-4">
            プライバシーポリシー
          </Link>
          に沿って取り扱います。
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-contact inline-flex h-[60px] shrink-0 items-center justify-center gap-3.5 rounded-full bg-ink px-10 font-en text-base font-medium tracking-[-0.01em] text-white disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send"} <span aria-hidden="true">→</span>
        </button>
      </div>

      <p role="status" aria-live="polite" className="text-sm font-medium text-[#B3261E]">
        {status === "error" ? errorMessage : ""}
      </p>
    </form>
  );
}
