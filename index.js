const express = require('express');
const app = express();
const https = require('https');
const http = require('http');
const fs = require("fs");

const httpsPort = 443;
const httpPort = 80;
/* 
const httpsOptions = {
  key: fs.readFileSync("./key/test_key.pem", "utf-8"),
  cert: fs.readFileSync("./key/test_cert.pem", "utf-8"),
}; */

// const httpsServer = https.createServer(httpsOptions, app);
const httpServer = http.createServer(app);
const io = require('socket.io').listen(httpServer);

/* app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
 */
app.post('/', function (req, res) {
  io.emit('voice', {
   content:req.query.content
  }

 );

  res.json({
    status: 200
  });

});



/* httpsServer.listen(httpsPort, function () {
  console.log("https server is running on " + httpsPort);
}); */

httpServer.listen(httpPort, function () {
  console.log("http server is running on " + httpPort);
});