const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 3000 });

app.use(express.json());
app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port);
console.log("Weyy estamos en: " + port);
