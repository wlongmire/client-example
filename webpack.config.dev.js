var webpack = require('webpack');
var path = require('path');

var config = require('./src/config');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:' + config.webpackserver.port,
    'webpack/hot/only-dev-server',
    './src/app/index'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/js'
  },

  module: {
    loaders: [{
      test: /\.jsx?/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass'
    },
    {
      test: /\.json$/,
      loader: 'json'
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    }]
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    root: path.resolve(__dirname),
    alias: {
      app: 'src/app',
      components: 'src/app/components',
      config: 'src/config',
      content: 'src/content',
      routes: 'src/app/routes',
      src: 'src'
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  devtool: 'cheap-module-eval-source-map'
};
