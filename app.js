#!/usr/bin/env babel-node

var fs = require('fs');
var _ = require('lodash');
var request = require('request');
var xpath = require('xpath');
var dom = require('xmldom').DOMParser;
var yaml = require('js-yaml');

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
      resolve(new dom().parseFromString(body));
    });
  });
};

var check_file = function(feed) {

};

// Get document, or throw exception on error
try {
  var feeds = yaml.safeLoad(fs.readFileSync('feeds.yml', 'utf8'));

  _.forEach(feeds, function(feed) {
    request_file(feed).then(function(dom) {
      console.log(dom);
    });
  });
} catch (e) {
  console.log(e);
}
