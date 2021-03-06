var express = require('express');
var router = express.Router();

var xml2js = require('xml2js'),
    FeedParser = require('feedparser'),
    Request = require('request');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/feed', function(req, res) {

  var feedparser = new FeedParser(),
      tags = [];

  Request('http://gifgeneral.com/?feed=rss2')
      .pipe(feedparser)
      .on('error', function(error) {
      // always handle errors
          console.log('error!');
          console.log(error);
      })
      .on('meta', function (meta) {
      // do something
          // console.log(meta);
      })
      .on('response', function (response) {
          console.log('response!');
      // do something else, then do the next thing
      });
      // .pipe(FeedParser);

  feedparser.on('data', function (feed) {
    var item = feed,//this.read(),
        // rx = /(<img.*\/>)/g;
        rx = /src="(.+?)"/;

    var groups = item.description.split('<img'),
        newTags;

    newTags = groups.map(function(d) {
      var match = rx.exec(d);
      if(!match) return;
      return match[1];
    });

    newTags = newTags.filter(function(d) { return d; });

    tags = tags.concat(newTags);

  }).on('end', function() {
    res.send({ tags:tags });
  });

});

module.exports = router;
