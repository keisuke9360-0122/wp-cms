const nextConfig = {
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
