const config = {
  env: process.env.NODE_ENV,
  name: 'skonkworks',

  app: {},

  server: {
    port: 8888
  }
};

if (config.env === 'development') {
  config.foo = 'bar:development';

  config.server.cors = {
    origin: 'http://localhost:7777'
  };

} else if (config.env === 'production') {
  config.foo = 'bar:production';
}

export default config;
