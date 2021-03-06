const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, '../src'),
  entry: {
    app: [
      'react-hot-loader/patch',
      './app.jsx'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  resolveLoader: {
    alias: {
      'css-prefix-variables': path.resolve(__dirname, './lib/css-prefix-variables.js')
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: ['eslint-loader']
      },
      {
        enforce: 'pre',
        test: /\.css$/,
        include: [
          path.resolve(__dirname, '../src/app'),
          path.resolve(__dirname, '../src/components')
        ],
        use: [
          {
            loader: 'css-prefix-variables',
            options: {
              path: path.resolve(__dirname, '../src/variables/variables.css')
            }
          }
        ]
      },
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'images/[name].[md5:hash:hex:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|otf|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'fonts/[name].[md5:hash:hex:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(mp4|ogg|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[md5:hash:hex:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/templates/index.html'),
      filename: 'index.html',
      favicon: path.resolve(__dirname, '../src/templates/images/favicon.png')
    })
  ]
};
