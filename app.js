const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { emit } = require('process');
const io = new Server(server);
let connectedUsers = {
  playerOne: "",
  playerTwo: ""
};
let p1Move = "";
let p2Move = "";

io.on('connection', (socket) => {
  // Handle user nickname validation
  socket.on('userNickname', (nickname) => {
    if (connectedUsers.playerOne !== "" && connectedUsers.playerTwo !== "") {
      // If maximum users reached, reject the connection
      socket.emit('connectionRejected', 'Maximum users reached. Try again later.');
      socket.disconnect(true);
    } else if (connectedUsers.playerOne === nickname || connectedUsers.playerTwo === nickname) {
      // If the nickname is already taken, reject the connection
      socket.emit('connectionRejected', 'Nickname is already taken. Please choose a different one.');
    } else if (connectedUsers.playerOne == "" ) {
      // Assign the first user as 'player1'
      connectedUsers.playerOne = nickname;
      socket.emit('connectionAccepted', 'You are the Player 1!!');
      io.emit('userName1', connectedUsers.playerOne);
      console.log(connectedUsers.playerOne + ' connected');
      console.log(connectedUsers);
    } else if (connectedUsers.playerTwo == "") {
      // Assign the second user as 'player2'
      connectedUsers.playerTwo = nickname;
      socket.emit('connectionAccepted', 'You are the Player 2!!');
      io.emit('userName2', connectedUsers.playerTwo);
      console.log(connectedUsers.playerTwo + ' connected');
      console.log(connectedUsers);
    }
    // Handle disconnect event
    socket.on('disconnect', () => {
      console.log(nickname + ' disconnected');
      
      if (connectedUsers.playerOne === nickname) {
        connectedUsers.playerOne = "";
      } else if (connectedUsers.playerTwo === nickname) {
        connectedUsers.playerTwo = "";
      }
    });
  });
  socket.on('movePlayed', (player1Move, player2Move) => {  //Verifies moves on the server side

    p1Move = player1Move.move;
    p2Move = player2Move.move;

    console.log(p1Move);
    io.emit('move1Played', p1Move);
    console.log(p2Move);
    io.emit('move2Played', p2Move);
    function whoWon() {
      if (connectedUsers.playerOne === "" || connectedUsers.playerTwo === "") {
        socket.emit('whoWins', 'Not connected');
      } else if (p1Move === "" || p2Move === "") {
        console.log(p1Move + " y " + p2Move);
        socket.emit('whoWins', 'waiting');
      } else if (p1Move === p2Move) {
        // Draw or same move
        io.emit('whoWins', 'draw');
      } else if (
        (p1Move === "rock" && p2Move === "scissors") ||
        (p1Move === "paper" && p2Move === "rock") ||
        (p1Move === "scissors" && p2Move === "paper")
        ) {
          // Player 1 wins
        io.emit('whoWins', 'player1');
      } else {
        // Player 2 wins
        io.emit('whoWins', 'player2');
      }
    }  
    whoWon();

  });
  socket.on('restart', (msg) => {
    if (msg === "go") {
      io.emit('restarting', msg);
    }
  });
});


app.use(express.json());
app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(3000, () => {
  console.log('Weyy estamos en: 3000');
});