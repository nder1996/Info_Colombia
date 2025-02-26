const webpack = require('webpack');

module.exports = function override(config) {
  // Asegúrate de que exista la propiedad fallback y agrega el polyfill para "crypto"
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve('crypto-browserify')
  };

  // Opcional: Provee variables globales si se necesitan (como process o Buffer)
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  );

  return config;
};
