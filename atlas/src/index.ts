import express from 'express'
import http from 'http'
import Redis from './database/Redis'

const app = express();

const client = Redis.getInstance();

app.get('/', function(req, res, next) {
  client.incr('counter', function(err: Error, counter: Number|String) {
    if(err) return next(err);
    res.send('This page has been viewed ' + counter + ' times!');
  });
});

http.createServer(app).listen(process.env.PORT || 8080, function() {
  console.log('Listening on port ' + (process.env.PORT || 8080));
});