var http = require("http");
var fs = require("fs");
var path = require("path");
var link = require("./link-handler");


var handler = function(req, res, json) {
  urlArray = req.url.toLowerCase().split("/");

  if (urlArray[1] == "tweets") {
    var tweets = new Array();
    for (var i=0; i<json.length; i++) {
      item = [
        "#" + json[i].id,
        json[i].text,
        json[i].user.screen_name + " - " + json[i].created_at.split(" ").slice(0, 4).join(" ")
      ].join("<br>");

      tweets.push(item);
    }
    pageStatus = 200;
    data = tweets;
  }

  console.log(data);
  res.setHeader("Content-Type", "application/json");
  res.writeHead(pageStatus);
  res.write(JSON.stringify(data));
  res.end();
}

module.exports.handler = handler;

