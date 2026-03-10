const gameBoard = document.getElementById("game-board");
const player = document.getElementById("player");
const restartBtn = document.getElementById("restart-btn");

const boardWidth = 800;
const boardHeight = 500;

let playerX = 370;
const playerSpeed = 20;


function renderPlayer() {
    player.style.left = `${playerX}px`;
}

function movePlayer(direction) {
    if (gameOver) {
        return;
    }

    playerX += direction * playerSpeed;

    if (playerX < 0) {
        playerX = 0;
    }

    if (playerX > boardWidth - 60) {
        playerX = boardWidth - 60;
    }

    renderPlayer();
}
