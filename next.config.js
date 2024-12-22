/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    GOOGLE_MAP_API: process.env.GOOGLE_MAP_API,
  }
}
