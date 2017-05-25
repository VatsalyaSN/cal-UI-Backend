var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var url = require("file-loader");

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/calendar'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
    // js
    {
      test: /\.js$/,
      loaders: ['babel']
    },
    // CSS
    { 
      test: /\.styl$/, 
      include: path.join(__dirname, 'src'),
      loader: 'style-loader!css-loader!stylus-loader'
    },
    {
      test : /\.css$/,
      loader : 'style-loader!css-loader'
      },
    //   { test: /\.(ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
    //   loader: "file-loader" 
    // }

    {
        test: /\.(otf|eot|svg|ttf|woff)\??/,
        loader: 'url-loader?limit=8192'
      }
    ]
  }
};
