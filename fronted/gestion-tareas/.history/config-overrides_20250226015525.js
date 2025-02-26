const webpack = require('webpack');

module.exports = function override(config) {
  // Agrega el fallback para el módulo "crypto"
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve('crypto-browserify')
  };

  // (Opcional) Provee variables globales para 'process' y 'Buffer'
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  );

  return config;
};
