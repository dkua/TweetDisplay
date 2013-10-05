var http = require("http");
var fs = require("fs");
var path = require("path");
var link = require("./link-handler");


function listTweets(json) {
  var data = new Array();
  for (var i=0; i<json.length; i++) {
    item = {
      "id": json[i].id,
      "tweet": json[i].text,
      "user": json[i].user.screen_name,
      "date": json[i].created_at.split(" ").slice(0, 4).join(" ")
    }
    data.push(item);
  }
  return data;
}

function getTweet(id, json) {
  for (var i=0; i<json.length; i++) {
    if (json[i].id === +id) {
      return json[i];
    }
  }
}

function getTweetLinks(id, json) {
  var data = new Array();
  for (var i=0; i<json.length; i++) {
    if (json[i].id === +id) {
      item = {
        "tweet_id": json[i].id
      }
      var urls = json[i].entities.urls;
      for (var n=0; n<urls.length; n++) {
        item["link" + n+1] = urls[n].display_url;
      }
      data.push(item);
    }
  }
  return data;
}

function getTweetHashtags(id, json) {
  var data = new Array();
  for (var i=0; i<json.length; i++) {
    if (json[i].id === +id) {
      item = {
        "tweet_id": json[i].id
      }
      var hashtags = json[i].entities.hashtags;
      for (var n=0; n<hashtags.length; n++) {
        item["hashtag" + n+1] = hashtags[n].text;
      }
      data.push(item);
    }
  }
  return data;
}

function getTweetMentions(id, json) {
  var data = new Array();
  for (var i=0; i<json.length; i++) {
    if (json[i].id === +id) {
      item = {
        "tweet_id": json[i].id
      }
      var mentions = json[i].entities.user_mentions;
      console.log(mentions);
      for (var n=0; n<mentions.length; n++) {
        item["mentions" + n+1] = mentions[n].screen_name;
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
      if (urlArray[1] == "tweets") {
        pageStatus = 200;
        data = data.concat(listTweets(json));
      }
    case 3:
      if (!isNaN(urlArray[2])) {
        pageStatus = 200;
        item = getTweet(urlArray[2], json);
        data.push(item);
      }
    case 4:
      if (urlArray[3] === "links") {
        pageStatus = 200;
        data = data.concat(getTweetLinks(urlArray[2], json));
      } else if (urlArray[3] === "hashtags") {
        pageStatus = 200;
        data = data.concat(getTweetHashtags(urlArray[2], json));
      } else if (urlArray[3] === "mentions") {
        pageStatus = 200;
        data = data.concat(getTweetMentions(urlArray[2], json));
      }
  }
  console.log(data);
  res.setHeader("Content-Type", "application/json");
  res.writeHead(pageStatus);
  res.write(JSON.stringify(data));
  res.end();
}

module.exports.handler = handler;

