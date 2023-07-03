const trianglePlayer = document.getElementById("triangleImg");
const rockPlayer = document.getElementById("rockImg");
const paperPlayer = document.getElementById("paperImg");
const scissorsPlayer = document.getElementById("scissorsImg");
const triangleCPU = document.getElementById("triangleImg2");
const rockCPU = document.getElementById("rockImg2");
const paperCPU = document.getElementById("paperImg2");
const scissorsCPU = document.getElementById("scissorsImg2");

rockPlayer.addEventListener("click", function() {
  playerPlays("rock");
});

paperPlayer.addEventListener("click", function() {
  playerPlays("paper");
});

scissorsPlayer.addEventListener("click", function() {
  playerPlays("scissors");
});

const playerPlays = (play) => {
    const plays = {
      rock: {
        playerElement: rockPlayer,
        cpuElement: rockCPU
      },
      paper: {
        playerElement: paperPlayer,
        cpuElement: paperCPU
      },
      scissors: {
        playerElement: scissorsPlayer,
        cpuElement: scissorsCPU
      }
    };
  
    Object.values(plays).forEach(({ playerElement, cpuElement }) => {
      playerElement.style.display = 'none';
      playerElement.style.transform = 'scale(1)';
      playerElement.style.transition = 'transform 0.75s ease';
  
      cpuElement.style.display = 'none';
      cpuElement.style.transform = 'scale(1)';
      cpuElement.style.transition = 'transform 0.75s ease';
    });
  
    const { playerElement, cpuElement } = plays[play];
  
    playerElement.style.display = 'block';
    playerElement.style.transform = 'scale(2)';
  
    cpuPlay(cpuElement);
    whoWon(play);
  };
  
  function restart() {
    const elements = [
      trianglePlayer, rockPlayer, paperPlayer, scissorsPlayer,
      triangleCPU, rockCPU, paperCPU, scissorsCPU
    ];
  
    elements.forEach(element => {
      element.style.display = 'block';
      element.style.transform = 'scale(1)';
      element.style.transition = 'transform 0.75s ease';
    });
  
    result.innerHTML = '';
    rockPlayer.style.pointerEvents = 'initial';
    paperPlayer.style.pointerEvents = 'initial';
    scissorsPlayer.style.pointerEvents = 'initial';
  }
  
  function cpuPlay(cpuElement) {
    const cpuTurn = Math.floor(Math.random() * 3);
  
    [triangleCPU, rockCPU, paperCPU, scissorsCPU].forEach(element => {
      element.style.display = 'none';
    });
  
    cpuElement.style.display = 'block';
    cpuElement.style.transform = 'scale(2)';
  }
  
  function showMessage(message, score) {
    result.style.transition = 'transform 0.75s ease';
    result.innerHTML = message;
    score++;
    cpuScore.innerHTML = currentScoreCPU;
    cpuTurn = Math.floor(Math.random() * 3);
  }
  
  function whoWon(play) {
    if (cpuTurn === 0) {
      if (play === 'rock') {
        rockPlayer.style.pointerEvents = 'none';
        drawMessage();
      } else if (play === 'paper') {
        paperPlayer.style.pointerEvents = 'none';
        winMessage();
      } else if (play === 'scissors') {
        scissorsPlayer.style.pointerEvents = 'none';
        loseMessage();
      }
    } else if (cpuTurn === 1) {
      // handle CPU playing rock
    } else if (cpuTurn === 2) {
      // handle CPU playing scissors
    }
  }
  