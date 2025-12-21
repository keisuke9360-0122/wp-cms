export const dynamic = "force-static";

export default function ContactThanks() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
        送信が完了しました
      </h1>

      <p className="text-gray-700 text-lg md:text-xl mb-10">
        お問い合わせありがとうございます。内容を確認し、必要に応じてご連絡いたします。
      </p>

      <a
        href="/"
        className="px-6 py-3 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white rounded-lg font-semibold shadow hover:opacity-90 transition"
      >
        トップページへ戻る
      </a>
    </section>
  );
}
