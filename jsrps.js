const trianglePlayer1 = document.getElementById("triangleImg");
const rockPlayer1 = document.getElementById("rockImg");
const paperPlayer1 = document.getElementById("paperImg");
const scissorsPlayer1 = document.getElementById("scissorsImg");
const trianglePlayer2 = document.getElementById("triangleImg2");
const rockPlayer2 = document.getElementById("rockImg2");
const paperPlayer2 = document.getElementById("paperImg2");
const scissorsPlayer2 = document.getElementById("scissorsImg2");
const result = document.getElementById("result");
const player2Score = document.getElementById("cpuScore");
const player1Score = document.getElementById("playerScore");
const newGameButton = document.getElementById("restart");
var currentScorePlayer1 = 0;
var currentScorePlayer2 = 0;

const defaultPlayer1Move = {
    move: ""
};

const defaultPlayer2Move = {
    move: ""
};

var socket = io();
var player1Move = defaultPlayer1Move;
var player2Move = defaultPlayer2Move;

window.onload = function() {
    requestNickname();
};

function requestNickname() {
    let nickname = prompt("Please enter your nickname:", "");
    if (nickname == null || nickname == "") {
        alert("Nickname cannot be empty. Please try again.");
        requestNickname(); // Prompt again if nickname is empty
    } else {
        socket
        // Connect to the server and pass the nickname
        socket.emit('userNickname', nickname);
    }
}

socket.on('connectionAccepted', (message) => {
    alert(message);
    if (message === "You are the Player 1!!"){
        rockPlayer2.style.pointerEvents = "none";
        paperPlayer2.style.pointerEvents = "none";
        scissorsPlayer2.style.pointerEvents = "none";
    } else if (message === "You are the Player 2!!"){
        paperPlayer1.style.pointerEvents = "none";
        scissorsPlayer1.style.pointerEvents = "none";
        rockPlayer1.style.pointerEvents = "none";
    }
});

socket.on('connectionRejected', (message) => {
    if (message === 'Maximum users reached. Try again later.') {
        alert(message);
        // Perform the desired action, such as reloading the page
        window.location.reload();
    } else if (message === 'Nickname is already taken. Please choose a different one.') {
        // Handle the case when the nickname is already taken
        alert(message);
        // Prompt for a new nickname, for example:
        requestNickname();
    }
}); 

function play () {
    socket.emit('movePlayed', player1Move, player2Move);
}

function player1ClicksRock () {
    player1Move.move = "rock";
    play();
}

function player1PlaysRock () {
    paperPlayer1.style.display = 'none';
    scissorsPlayer1.style.display = 'none';
    trianglePlayer1.style.display = 'none';
    rockPlayer1.style.transform = "scale(2)";
    rockPlayer1.style.transition = "transform 0.75s ease";
    rockPlayer1.style.pointerEvents = 'none';
}

function player1ClicksPaper () {
    player1Move.move = "paper";
    play();
}

function player1PlaysPaper () {
    rockPlayer1.style.display = 'none';
    scissorsPlayer1.style.display = 'none';
    trianglePlayer1.style.display = 'none';
    paperPlayer1.style.transform = "scale(2)";
    paperPlayer1.style.transition = "transform 0.75s ease";
    paperPlayer1.style.pointerEvents = 'none';
}

function player1ClicksScissors () {
    player1Move.move = "scissors";
    play();
}

function player1PlaysScissors () {
    paperPlayer1.style.display = 'none';
    rockPlayer1.style.display = 'none';
    trianglePlayer1.style.display = 'none';
    scissorsPlayer1.style.transform = "scale(2)";
    scissorsPlayer1.style.transition = "transform 0.75s ease";
    scissorsPlayer1.style.pointerEvents = 'none';
}

function player2ClicksRock () {
    player2Move.move = "rock";
    play();
}

function player2PlaysRock () {
    paperPlayer2.style.display = 'none';
    scissorsPlayer2.style.display = 'none';
    trianglePlayer2.style.display = 'none';
    rockPlayer2.style.transform = "scale(2)";
    rockPlayer2.style.transition = "transform 0.75s ease";
    rockPlayer2.style.pointerEvents = 'none';
}

function player2ClicksPaper () {
    player2Move.move = "paper";
    play();
}

function player2PlaysPaper () {
    rockPlayer2.style.display = 'none';
    scissorsPlayer2.style.display = 'none';
    trianglePlayer2.style.display = 'none';
    paperPlayer2.style.transform = "scale(2)";
    paperPlayer2.style.transition = "transform 0.75s ease";
    paperPlayer2.style.pointerEvents = 'none';
}

function player2ClicksScissors () {
    player2Move.move = "scissors";
    play();
}

function player2PlaysScissors () {
    paperPlayer2.style.display = 'none';
    rockPlayer2.style.display = 'none';
    trianglePlayer2.style.display = 'none';
    scissorsPlayer2.style.transform = "scale(2)";
    scissorsPlayer2.style.transition = "transform 0.75s ease";
    scissorsPlayer2.style.pointerEvents = 'none';
}

function restart () {
    socket.emit('restart', "go");
}

socket.on('restarting', (message) => {
    if (message === "go") {
        restartGame();
    }
});

function restartGame () {
    trianglePlayer1.style.display = 'block';
    rockPlayer1.style.display = 'block';
    rockPlayer1.style.transform = "scale(1)";
    rockPlayer1.style.transition = "transform 0.75s ease";
    rockPlayer1.style.pointerEvents = 'auto';
    paperPlayer1.style.display = 'block';
    paperPlayer1.style.transform = "scale(1)";
    paperPlayer1.style.transition = "transform 0.75s ease";
    paperPlayer1.style.pointerEvents = 'auto';
    scissorsPlayer1.style.display = 'block';
    scissorsPlayer1.style.transform = "scale(1)";
    scissorsPlayer1.style.transition = "transform 0.75s ease";
    scissorsPlayer1.style.pointerEvents = 'auto';
    trianglePlayer2.style.display = 'block';
    rockPlayer2.style.display = 'block';
    rockPlayer2.style.transform = "scale(1)";
    rockPlayer2.style.transition = "transform 0.75s ease";
    rockPlayer2.style.pointerEvents = 'auto';
    paperPlayer2.style.display = 'block';
    paperPlayer2.style.transform = "scale(1)";
    paperPlayer2.style.transition = "transform 0.75s ease";
    paperPlayer2.style.pointerEvents = 'auto';
    scissorsPlayer2.style.display = 'block';
    scissorsPlayer2.style.transform = "scale(1)";
    scissorsPlayer2.style.transition = "transform 0.75s ease";
    scissorsPlayer2.style.pointerEvents = 'auto';
    result.innerHTML = ""; 
    player1Move.move = "";
    player2Move.move = "";
    newGameButton.style.pointerEvents = 'none';
    console.log(player2Move.move + " " + player1Move.move);
}

function drawMessage () {
    result.style.transition = "transform 0.75s ease";
    result.innerHTML = "It's a Draw!!"; 
    newGameButton.style.pointerEvents = 'auto';

}

function win1Message () {
    console.log(currentScorePlayer1);
    result.style.transition = "transform 0.75s ease";
    result.innerHTML = "Player 1 wins!!"; 
    currentScorePlayer1++;
    player1Score.innerHTML = currentScorePlayer1; 
    newGameButton.style.pointerEvents = 'auto';

}

function win2Message () {
    result.style.transition = "transform 0.75s ease";
    result.innerHTML = "Player 2 wins!!"; 
    currentScorePlayer2++;
    player2Score.innerHTML = currentScorePlayer2; 
    newGameButton.style.pointerEvents = 'auto';

}

socket.on('move1Played', (msg) => {
    player1Move.move = msg;
    console.log("p1: " + msg);
    if (msg === "rock") {
        player1PlaysRock();
    } else if (msg === "paper") {
        player1PlaysPaper();
    } else if (msg === "scissors") {
        player1PlaysScissors();
    }
});

socket.on('move2Played', (msg) => {
    player2Move.move = msg;
    console.log("p2: " + msg);
    if (msg === "rock") {
        player2PlaysRock();
    } else if (msg === "paper") {
        player2PlaysPaper();
    } else if (msg === "scissors") {
        player2PlaysScissors();
    }
});

socket.on('whoWins', (message) => {
    if (message === "Not connected") {
        alert("Waiting for an opponent!");
    } else if (message === "waiting") {
        result.innerHTML = "Waiting for opponent's move..."; 
    } else if (message === "draw") {
        // Draw or same move
        console.log("draw");
        drawMessage();
    } else if (message === "player1") {
        // Player 1 wins
        console.log("p1");
        win1Message();
    } else if (message === "player2") {
        console.log("p2");
        // Player 2 wins
        win2Message();
    } else {
        console.log("f");
    }
});