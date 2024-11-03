/** @type {import('next').NextConfig} */
const nextConfig = {};


// next.config.mjs
export default {
    reactStrictMode: true,
    images: {
      domains: ['udon-app.s3.ap-northeast-1.amazonaws.com'], // 外部ホスト名を追加
    },
  };
  
