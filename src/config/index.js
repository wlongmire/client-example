const config = {
  env: process.env.NODE_ENV,
  name: 'ownersEdge',
  appId: process.env.appID || '57ab6abcf36d2840aa667f6e',
  argoEmail: process.env.argoEmail || 'justin.steranko@gmail.com',
  mongoURI: process.env.mongoURI || 'mongodb://apiuser:apipass@ds153765.mlab.com:53765/ownersedgedev',
  sendGridKey: process.env.sendGridKey || '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',
  argoTemplateId: '21b98629-1c78-4de5-81a0-431f6666bc98',
  brokerTemplateUd: '365b9c92-9e3d-4699-88ff-d9ea688e769b',

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
  config.server.url = 'http://www.ownersedge.us'
}

module.exports = config;
