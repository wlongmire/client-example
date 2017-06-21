var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = require('./src/config');

module.exports = {
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://localhost:' + config.webpackserver.port,
    'webpack/hot/only-dev-server',
    './src/app/index'
  ],

  output: {
    path: path.join(__dirname, 'dist/public'),
    filename: 'js/bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.jsx?/,
      loaders: ['react-hot', 'babel'],
      useBuiltIns: true,
      include: path.join(__dirname, 'src')
    }, {
      test: /\.s?css$/,
      loader: 'style?name=css/bundle.css!css?sourceMap!sass?sourceMap'
    },
    {
      test: /\.json$/,
      loader: 'json'
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader?name=fonts/[name].[ext]'
    }]
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css', '.scss'],
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
