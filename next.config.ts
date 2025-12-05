const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "xs400651.xsrv.jp", // ←ここ！あなたのWPの実際のホスト名
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
