const webpack = require('webpack');

module.exports = function override(config) {
  // Preserve existing fallbacks and add new ones
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify'),
    url: require.resolve('url'),
    buffer: require.resolve('buffer'),
    process: require.resolve('process/browser')
  });
  config.resolve.fallback = fallback;

  // Add plugins
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: ['process/browser'],
      Buffer: ['buffer', 'Buffer']
    }),
    // Add this to help resolve process/browser properly
    new webpack.NormalModuleReplacementPlugin(
      /node:process/,
      (resource) => {
        resource.request = 'process/browser';
      }
    )
  ]);

  // Make sure process/browser is resolved
  config.resolve.alias = {
    ...config.resolve.alias,
    'process/browser': require.resolve('process/browser')
  };

  return config;
};