const trianglePlayer = document.getElementById("triangleImg");
const rockPlayer = document.getElementById("rockImg");
const paperPlayer = document.getElementById("paperImg");
const scissorsPlayer = document.getElementById("scissorsImg");
const triangleCPU = document.getElementById("triangleImg2");
const rockCPU = document.getElementById("rockImg2");
const paperCPU = document.getElementById("paperImg2");
const scissorsCPU = document.getElementById("scissorsImg2");
const result = document.getElementById("result");
const cpuScore = document.getElementById("cpuScore");
const playerScore = document.getElementById("playerScore");
const newGameButton = document.getElementById("restart");
var currentScorePlayer = 0;
var currentScoreCPU = 0;

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
        rockCPU.style.pointerEvents = "none";
        paperCPU.style.pointerEvents = "none";
        scissorsCPU.style.pointerEvents = "none";
    } else if (message === "You are the Player 2!!"){
        paperPlayer.style.pointerEvents = "none";
        scissorsPlayer.style.pointerEvents = "none";
        rockPlayer.style.pointerEvents = "none";
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
    paperPlayer.style.display = 'none';
    scissorsPlayer.style.display = 'none';
    trianglePlayer.style.display = 'none';
    rockPlayer.style.transform = "scale(2)";
    rockPlayer.style.transition = "transform 0.75s ease";
    rockPlayer.style.pointerEvents = 'none';
}

function player1ClicksPaper () {
    player1Move.move = "paper";
    play();
}

function player1PlaysPaper () {
    rockPlayer.style.display = 'none';
    scissorsPlayer.style.display = 'none';
    trianglePlayer.style.display = 'none';
    paperPlayer.style.transform = "scale(2)";
    paperPlayer.style.transition = "transform 0.75s ease";
    paperPlayer.style.pointerEvents = 'none';
}

function player1ClicksScissors () {
    player1Move.move = "scissors";
    play();
}

function player1PlaysScissors () {
    paperPlayer.style.display = 'none';
    rockPlayer.style.display = 'none';
    trianglePlayer.style.display = 'none';
    scissorsPlayer.style.transform = "scale(2)";
    scissorsPlayer.style.transition = "transform 0.75s ease";
    scissorsPlayer.style.pointerEvents = 'none';
}

function player2ClicksRock () {
    player2Move.move = "rock";
    play();
}

function player2PlaysRock () {
    paperCPU.style.display = 'none';
    scissorsCPU.style.display = 'none';
    triangleCPU.style.display = 'none';
    rockCPU.style.transform = "scale(2)";
    rockCPU.style.transition = "transform 0.75s ease";
    rockCPU.style.pointerEvents = 'none';
}

function player2ClicksPaper () {
    player2Move.move = "paper";
    play();
}

function player2PlaysPaper () {
    rockCPU.style.display = 'none';
    scissorsCPU.style.display = 'none';
    triangleCPU.style.display = 'none';
    paperCPU.style.transform = "scale(2)";
    paperCPU.style.transition = "transform 0.75s ease";
    paperCPU.style.pointerEvents = 'none';
}

function player2ClicksScissors () {
    player2Move.move = "scissors";
    play();
}

function player2PlaysScissors () {
    paperCPU.style.display = 'none';
    rockCPU.style.display = 'none';
    triangleCPU.style.display = 'none';
    scissorsCPU.style.transform = "scale(2)";
    scissorsCPU.style.transition = "transform 0.75s ease";
    scissorsCPU.style.pointerEvents = 'none';
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
    trianglePlayer.style.display = 'block';
    rockPlayer.style.display = 'block';
    rockPlayer.style.transform = "scale(1)";
    rockPlayer.style.transition = "transform 0.75s ease";
    rockPlayer.style.pointerEvents = 'auto';
    paperPlayer.style.display = 'block';
    paperPlayer.style.transform = "scale(1)";
    paperPlayer.style.transition = "transform 0.75s ease";
    paperPlayer.style.pointerEvents = 'auto';
    scissorsPlayer.style.display = 'block';
    scissorsPlayer.style.transform = "scale(1)";
    scissorsPlayer.style.transition = "transform 0.75s ease";
    scissorsPlayer.style.pointerEvents = 'auto';
    triangleCPU.style.display = 'block';
    rockCPU.style.display = 'block';
    rockCPU.style.transform = "scale(1)";
    rockCPU.style.transition = "transform 0.75s ease";
    rockCPU.style.pointerEvents = 'auto';
    paperCPU.style.display = 'block';
    paperCPU.style.transform = "scale(1)";
    paperCPU.style.transition = "transform 0.75s ease";
    paperCPU.style.pointerEvents = 'auto';
    scissorsCPU.style.display = 'block';
    scissorsCPU.style.transform = "scale(1)";
    scissorsCPU.style.transition = "transform 0.75s ease";
    scissorsCPU.style.pointerEvents = 'auto';
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
    console.log(currentScorePlayer);
    result.style.transition = "transform 0.75s ease";
    result.innerHTML = "Player 1 wins!!"; 
    currentScorePlayer++;
    playerScore.innerHTML = currentScorePlayer; 
    newGameButton.style.pointerEvents = 'auto';

}

function win2Message () {
    result.style.transition = "transform 0.75s ease";
    result.innerHTML = "Player 2 wins!!"; 
    currentScoreCPU++;
    cpuScore.innerHTML = currentScoreCPU; 
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