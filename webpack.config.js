var webpack = require('webpack');
var path = require('path');

module.exports = {
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    },
    {
      test: /\.scss$/,
      loader: 'style!css!sass'
    },
    {
      test: /\.json$/,
      loader: 'json'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    root: path.resolve(__dirname),
    alias: {
      app: 'src/js/App',
      components: 'src/js/components',
      config: 'src/js/config',
      content: 'src/content',
      routes: 'src/js/routes',
      src: 'src'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"'
      }
    })
  ]
};
