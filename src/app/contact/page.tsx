export default function Contact() {
  return (
    <section className="max-w-xl mx-auto py-16 px-4 text-center">
      <h1 className="text-3xl font-bold mb-6">Contact</h1>
      <p className="mb-4">ご連絡は以下のSNSからお願いいたします。</p>
      <div className="flex justify-center gap-6">
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener"
          className="text-blue-400 hover:underline"
        >
          Twitter
        </a>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener"
          className="text-gray-300 hover:underline"
        >
          GitHub
        </a>
      </div>
    </section>
  );
}
