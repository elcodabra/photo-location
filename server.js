/*eslint no-console:0 */
var express = require('express');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var open = require('open');
var config = require('./webpack.config');
var compiler = webpack(config);
var app = express();

//console.log(compiler);

//process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  new WebpackDevServer(compiler, config.devServer)
    .listen(config.port, 'localhost', function(err) {
      if (err) {
        console.log(err);
      }
      console.log('Listening at localhost:' + config.port);
      open('http://localhost:' + config.port + '/webpack-dev-server/');
    });
} else {
  app.set('port', (process.env.PORT || config.port));
  app.use("/", express.static(__dirname + '/dist/'));
  app.listen(app.get('port'));
  console.log('Listening at ' + __dirname + '/dist/' + ' port:' + app.get('port'));
}

