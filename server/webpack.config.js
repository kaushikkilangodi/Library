module.exports={
    resolve: {
        fallback: {
          zlib: false,
          zlib: require.resolve('browserify-zlib'),
          querystring: require.resolve('querystring-es3'),
          path: require.resolve('path-browserify'),
          crypto: require.resolve('crypto-browserify'),
          fs: require.resolve('fs'), // or require.resolve('fs') if necessary
          stream: require.resolve('stream-browserify'),
          http: require.resolve('stream-http'),
          util: require.resolve('util/'),
          buffer: require.resolve('buffer/'),
          net: false,
        },
      },
}