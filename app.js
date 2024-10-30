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
const playersMove = {
  p1Movement: "",
  p2Movement: ""
};


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

    let moves = {
      p1Move: player1Move.move,
      p2Move: player2Move.move
    };

    if (moves.p1Move !== ""){
      playersMove.p1Movement = moves.p1Move;
    };
    if (moves.p2Move !== ""){
      playersMove.p2Movement = moves.p2Move
    };

    function whoWon() {
      if (connectedUsers.playerOne === "" || connectedUsers.playerTwo === "") {
        socket.emit('whoWins', 'Not connected');
      } else if (playersMove.p1Movement === "" || playersMove.p2Movement === "") {
        socket.emit('whoWins', 'waiting');
        console.log("waiting...");
      } else {
        console.log(playersMove);
        io.emit('move1Played', playersMove.p1Movement);
        io.emit('move2Played', playersMove.p2Movement);
        console.log(playersMove);
        if (playersMove.p1Movement === playersMove.p2Movement) {
          // Draw or same move
          io.emit('whoWins', 'draw');
          playersMove.p1Movement = ""; 
          playersMove.p2Movement = "";
        } else if (
          (playersMove.p1Movement === "rock" && playersMove.p2Movement === "scissors") ||
          (playersMove.p1Movement === "paper" && playersMove.p2Movement === "rock") ||
          (playersMove.p1Movement === "scissors" && playersMove.p2Movement === "paper")
          ) {
            // Player 1 wins
          io.emit('whoWins', 'player1');
          playersMove.p1Movement = ""; 
          playersMove.p2Movement = "";
        } else {
          // Player 2 wins
          io.emit('whoWins', 'player2');
          playersMove.p1Movement = ""; 
          playersMove.p2Movement = "";
        }
      } 
    }  

    whoWon();

  });
  socket.on('restart', (msg) => {
    if (msg === "go") {
      playersMove.p1Movement = ""; 
      playersMove.p2Movement = "";
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