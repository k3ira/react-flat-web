const path = require('path');
const config = require('./build.config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

function getCssScssLoaders(sourceMap) {
  return ['css', 'sass'].map((ext) => {
    return {loader: `${ext}-loader`, options: {sourceMap}};
  });
}

const webpackDevConfig = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    resolve('src/index.jsx')
  ],
  output: {
    path: resolve('src/build'),
    filename: 'flat-web.[hash:5].js',
    publicPath: config.build.assetsPublicPath,
    devtoolModuleFilenameTemplate: '[resource-path]'
  },
  devtool: config.dev.cssSourceMap ? '#cheap-source-map' : false,
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      components: resolve('src/components'),
      router: resolve('src/router')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: config.dev.extractStyles
          ? ExtractTextPlugin.extract({fallback: 'style-loader', use: getCssScssLoaders(config.dev.cssSourceMap)})
          : [{loader: 'style-loader'}].concat(getCssScssLoaders(config.dev.cssSourceMap))
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'fonts/[name].[hash:5].[ext]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'images/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({'process.env': config.dev.env}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      filename: resolve('build/index.html'),
      template: resolve('src/index.html'),
      inject: true
    })
  ]
};

if (config.dev.extractStyles) {
  webpackDevConfig.plugins.push(
    new ExtractTextPlugin('flat-web.[contenthash:5].css')
  );
}

module.exports = webpackDevConfig;