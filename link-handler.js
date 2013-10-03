var http = require("http");
var fs = require("fs");
var path = require("path");


var handler = function(req, res, json) {
  json = JSON.parse(json);
  res.setHeader("Content-Type", "text/html");
  res.writeHead(pageStatus);
  data = "Links";
  res.end(data);
}

module.exports.handler = handler;
