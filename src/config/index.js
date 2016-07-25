const config = {
  env: process.env.NODE_ENV,
  name: 'skonkworks',

  app: {

  },

  server: {
    cors: {
      origin: 'http://localhost:7777'
    },

    port: 7888
  }
};

if (config.env === 'development') {
  config.foo = 'bar:development';

} else if (config.env === 'production') {
  config.foo = 'bar:production';
}

export default config;
