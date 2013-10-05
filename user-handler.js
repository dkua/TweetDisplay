var http = require("http");
var fs = require("fs");
var path = require("path");


function listUsers(json) {
  var data = new Array();
  for (var i=0; i<json.length; i++) {
    item = {
      "id": json[i].user.id,
      "name": json[i].user.name,
      "screen_name": json[i].user.screen_name,
    }
    data.push(item);
  }
  return data;
}

function getUser(id, json) {
  for (var i=0; i<json.length; i++) {
    if (json[i].user.id_str === id) {
      return json[i];
    }
  }
}

function getUserTweets(id, json) {
  var data = new Array();
  for (var i=0; i<json.length; i++) {
    if (json[i].user.id_str === id) {
      item = {
        "tweet": json[i].text,
        "user": json[i].user.screen_name,
        "date": json[i].created_at.split(" ").slice(0, 4).join(" ")
      }
      data.push(item);
    }
  }
  return data;
}

var handler = function(req, res, json) {
  var urlArray = req.url.toLowerCase().split("/");
  var data = new Array();
  var pageStatus = 404;

  switch (urlArray.length) {
    case 2:
      if (urlArray[1] == "users") {
        pageStatus = 200;
        data = data.concat(listUsers(json));
      }
    case 3:
      if (!isNaN(urlArray[2])) {
        pageStatus = 200;
        item = getUser(urlArray[2], json);
        data.push(item);
      }
    case 4:
      if (urlArray[3] === "tweets") {
        pageStatus = 200;
        data = data.concat(getUserTweets(urlArray[2], json));
      }
  }
  console.log(data);
  res.setHeader("Content-Type", "application/json");
  res.writeHead(pageStatus);
  res.write(JSON.stringify(data));
  res.end();
}

module.exports.handler = handler;

