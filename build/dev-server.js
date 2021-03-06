const open = require('open');
const webpack = require('webpack');
const config = require('./build.config');
const webpackConfig = require('./webpack.dev.config');
const WebpackDevServer = require('webpack-dev-server');

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
  contentBase: 'playground/build',
  historyApiFallback: true,
  hot: true,
  inline: true,
  stats: config.dev.stats,
});

server.listen(config.dev.devServerPort, '0.0.0.0', () => {
  console.log(`Listening on port ${config.dev.devServerPort}`);
  open(`http://localhost:${config.dev.devServerPort}`);
});