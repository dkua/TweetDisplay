var http = require("http");
var fs = require("fs");
var path = require("path");
var tweet = require("./tweet-handler");
var user = require("./user-handler");

var favs = require("./favs.json");

PORT = 24824;


// Helper Function(s)


function getContentType(filePath) {
  var mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".txt": "text/plain"
  }
  contentType = mimeTypes[path.extname(filePath)];
  return contentType;
}


// Main Server Code


http.createServer(function(req, res) {
  console.log(req.method + ": " + req.url);
  var urlArray = req.url.toLowerCase().split("/");
  console.log(urlArray);
  var filePath = __dirname

  pageStatus = 200;

  var fileHandler = function(err, data) {
    if (err) {
      pageStatus = 404;
      fileData = "404 Not Found\n";
    } else {
      fileData = data;
    }
    res.writeHead(pageStatus, getContentType(filePath));
    res.write(fileData);
    res.end();
  }

  if (req.url === "/") {
    filePath = filePath + "/index.html";
    fs.readFile(filePath, fileHandler);
  } else if (urlArray[1] === "tweets") {
    tweet.handler(req, res, favs);
  } else if (urlArray[1] === "users") {
    user.handler(req, res, favs);
  } else {
    filePath = filePath + req.url;
    fs.readFile(filePath, fileHandler);
  }
}).listen(PORT);

console.log("Server running at http://127.0.0.1:" + PORT + "/ \nPress CTRL+C to shutdown.")
