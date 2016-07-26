const config = {
  env: process.env.NODE_ENV,
  name: 'skonkworks',

  app: {},

  server: {
    port: 8888
  },

  webpackserver: {
    port: 7777
  }
};

if (config.env === 'development') {
  config.server.cors = {
    origin: 'http://localhost:' + config.webpackserver.port
  };

} else if (config.env === 'production') {
  config.foo = 'bar:production';
}

module.exports = config;
