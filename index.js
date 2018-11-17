const express = require('express');
const app = express();
const http = require('http');
const httpPort = 80;
const httpServer = http.createServer(app);
const io = require('socket.io').listen(httpServer);
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.urlencoded());


app.post('/', function (req, res) {
  io.emit('voice', {
    content: req.body.content
  }
  );
  res.json({
    status: 200
  });

});
httpServer.listen(httpPort, function () {
  console.log("http server is running on " + httpPort);
});