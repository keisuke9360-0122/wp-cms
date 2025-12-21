export default function ContactThanks() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-3xl md:text-5xl font-semibold mb-4">
        送信が完了しました
      </h1>

      <p className="text-gray-600 text-base md:text-lg mb-8">
        お問い合わせありがとうございます。内容を確認し、折り返しご連絡いたします。
      </p>

      <a
        href="/"
        className="px-5 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 transition"
      >
        トップへ戻る
      </a>
    </section>
  );
}
