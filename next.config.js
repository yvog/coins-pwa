const runtimeCacheConfig = require('./cache')

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  reloadOnOnline: false,
  runtimeCaching: runtimeCacheConfig,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // the only images we are using are coin images from Numista, which are already optimized
    // and we run an exported app, where image optimization is not supported
    unoptimized: true,
  },
}

module.exports = withPWA(nextConfig)
