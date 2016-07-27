const config = {
  env: process.env.NODE_ENV,
  name: 'skonkworks',

  analytics: {
    ua: 'xxxxx-xxxxx',
    host: 'www.domain.com'
  },

  app: {},

  server: {
    url: 'http://localhost',
    port: 8888
  },

  webpackserver: {
    port: 7777
  }
};

if (config.env === 'development') {
  config.server.url += ':' + config.server.port;

  config.server.cors = {
    origin: 'http://localhost:' + config.webpackserver.port
  };

} else if (config.env === 'production') {
  config.server.url = 'http://www.domain.com'
}

module.exports = config;
