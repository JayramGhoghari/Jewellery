/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'wallpaperaccess.com' },
      { protocol: 'https', hostname: 'a.1stdibscdn.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'www.jeenjewels.com' },
      { protocol: 'https', hostname: 'tse2.mm.bing.net' },
      { protocol: 'https', hostname: 'tse3.mm.bing.net' },
      { protocol: 'https', hostname: 'i.pinimg.com' },
      { protocol: 'https', hostname: 'san-bro.com' },
      { protocol: 'https', hostname: 'mdcdiamonds.com' },
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'blog.southindiajewels.com' },
      { protocol: 'http', hostname: 'blog.southindiajewels.com' },
      { protocol: 'http', hostname: 'tse2.mm.bing.net' },
      { protocol: 'http', hostname: 'tse3.mm.bing.net' },
    ],
  },
};

export default nextConfig;

