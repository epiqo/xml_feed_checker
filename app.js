#!/usr/bin/env babel-node

var fs = require('fs');
var _ = require('lodash');
var request = require('request');
var xpath = require('xpath');
var dom = require('xmldom').DOMParser;
var yaml = require('js-yaml');
var argv = require('yargs').argv;

var request_file = function(feed) {
  return new Promise(function(resolve, reject) {
    request.get(feed, (err, res, body) => {
      if (err) {
        return reject(err);
      } else if (res.statusCode !== 200) {
        err = new Error("Unexpected status code: " + res.statusCode);
        err.res = res;
        return reject(err);
      }
      var feed_object = {
        url: feed,
        dom: new dom().parseFromString(body)
      };
      resolve(feed_object);
    });
  });
};

var check_file = function(feed) {
  console.log(feed.url);
  console.log(xpath.select(argv.xpath, feed.dom));
  console.log("");
};



// Get document, or throw exception on error
try {
  var feeds = yaml.safeLoad(fs.readFileSync(argv.file, 'utf8'));

  _.forEach(feeds, function(feed) {
    request_file(feed).then(check_file);
  });
} catch (e) {
  console.log(e);
}
