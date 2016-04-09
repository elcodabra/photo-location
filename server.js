/*eslint no-console:0 */
var express = require('express');
var request = require('request');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var open = require('open');
var config = require('./webpack.config');
var sessionSecrets = require('./src/lib/SessionSecrets');
var compiler = webpack(config);
var app = express();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var isDev = process.env.NODE_ENV === 'development';
var secrets = sessionSecrets();

app.use('/proxy-google', function(req, res) {
  req
    .pipe(request({
      url: 'https://maps.googleapis.com' + require('url').parse(req.url).path,
      qs: { key: secrets.google_api_key }
    }))
    .pipe(res);
});

app.use('/proxy-instagram', function(req, res) {
  req
    .pipe(request({
      url: 'https://api.instagram.com' + require('url').parse(req.url).path,
      qs: { client_id: secrets.instagram_client_id }
    }))
    .pipe(res);
});

app.use('/proxy-foursquare', function(req, res) {
  req
    .pipe(request({
      url: 'https://api.foursquare.com' + require('url').parse(req.url).path,
      qs: {
        client_id: secrets.foursquare_client_id,
        client_secret: secrets.foursquare_client_secret,
        v: '20151224'
      }
    }))
    .pipe(res);
});

if (isDev) {
  app.listen(config.port - 1);
  // webpack dev server
  new WebpackDevServer(compiler, config.devServer)
    .listen(config.port, 'localhost', function(err) {
      if (err) {
        console.log(err);
      }
      console.log('Listening at localhost:' + config.port);
      //open('http://localhost:' + config.port + '/webpack-dev-server/');
    });
} else {
  // FIXME: remove process.env.PORT
  app.set('port', (process.env.PORT || config.port));
  app.use("/", express.static(__dirname + '/dist/'));
  app.listen(app.get('port'));
  console.log('Listening at ' + __dirname + '/dist/' + ' port:' + app.get('port'));
}

