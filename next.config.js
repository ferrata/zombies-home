const withMakeswift = require('@makeswift/runtime/next/plugin')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: config => {
    config.module.rules.push({
      test: /\.ogg$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/sounds/',
          outputPath: 'static/sounds/',
          name: '[path][name].[ext]',
        },
      },
    })

    return config
  },
}

module.exports = withMakeswift(nextConfig)
