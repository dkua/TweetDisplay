var http = require("http");
var fs = require("fs");
var path = require("path");


var handler = function(req, res, json) {
  urlArray = req.url.toLowerCase().split("/");

  if (urlArray[1] == "users") {
    var users = new Array();
    for (var i=0; i<json.length; i++) {
      item = json[i].user.name + " (" + json[i].user.screen_name + ")";
      users.push(item);
    }
    pageStatus = 200;
    data = users;
  }

  console.log(data);
  res.setHeader("Content-Type", "application/json");
  res.writeHead(pageStatus);
  res.write(JSON.stringify(data));
  res.end();
}

module.exports.handler = handler;
