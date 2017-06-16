var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: [
    './src/app/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist/public'),
    filename: 'js/bundle.js',
    publicPath: '/'
  },
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
      loader: ExtractTextPlugin.extract('style', 'css!sass')
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
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // for production minification TO_DO_AK
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: { warnings: false }
    // }),
    new ExtractTextPlugin('css/bundle.css', { allChunks: true })
  ]
}
