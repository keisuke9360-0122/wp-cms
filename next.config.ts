// 転職向けのページ。メニューから外し、検索にも載せない
const careerPaths = ["/career", "/about", "/works", "/blog", "/posts/:path*"];

const nextConfig = {
  // 旧サロンページはトップと内容が重なるので、トップへ転送する
  async redirects() {
    return [{ source: "/salon", destination: "/", permanent: true }];
  },
  async headers() {
    return careerPaths.map((source) => ({
      source,
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    }));
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "xs400651.xsrv.jp",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "xs400651.xsrv.jp",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "urabiyou.jp",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
