const webpack = require('webpack');

module.exports = function override(config, env) {
  // Asegúrate de que exista la propiedad fallback
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve('crypto-browserify')
  };

  // Opcional: Proveer variables globales si es necesario
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  );

  return config;
};
