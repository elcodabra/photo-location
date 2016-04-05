/*eslint no-console:0 */
var express = require('express');
var request = require('request');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var open = require('open');
var config = require('./webpack.config');
var compiler = webpack(config);
var app = express();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var isDev = process.env.NODE_ENV === 'development';

app.use('/proxy-server', function(req, res, next) {
  request('https://maps.googleapis.com' + require('url').parse(req.url).path, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(response);
      //res.send(body);
    }
  })
});

if (isDev) {
  // port dev default 3000 for proxy service
  app.listen(3000);
  // webpack dev server
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

