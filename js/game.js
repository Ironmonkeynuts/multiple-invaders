const gameBoard = document.getElementById("game-board");
const player = document.getElementById("player");
const restartBtn = document.getElementById("restart-btn");

const boardWidth = 800;
const boardHeight = 500;

let playerX = 370;
const playerSpeed = 20;

let selectedBomb = 1;

const bombValues = [1, 2, 3, 5];

let enemies = [
    { id: 1, number: 10, health: 4, x: 60, y: 60, element: null },
    { id: 2, number: 12, health: 4, x: 180, y: 60, element: null },
    { id: 3, number: 20, health: 4, x: 300, y: 60, element: null },
    { id: 4, number: 24, health: 4, x: 420, y: 60, element: null },
    { id: 5, number: 30, health: 4, x: 540, y: 60, element: null }
];

let enemyDirection = 1;
const enemySpeed = 1;
const dropDistance = 20;

function createEnemies() {
    enemies.forEach((enemy) => {
        const enemyDiv = document.createElement("div");
        enemyDiv.classList.add("enemy");
        enemyDiv.textContent = enemy.number;
        enemyDiv.style.left = `${enemy.x}px`;
        enemyDiv.style.top = `${enemy.y}px`;
        gameBoard.appendChild(enemyDiv);
        enemy.element = enemyDiv;
    });
}

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

function fireBomb() {
    if (gameOver || bomb) {
        return;
    }

    bomb = document.createElement("div");
    bomb.classList.add("bomb");
    bomb.textContent = selectedBomb;
    bomb.dataset.value = selectedBomb;
    bomb.style.left = `${playerX + 23}px`;
    bomb.style.top = `${boardHeight - 50}px`;
    gameBoard.appendChild(bomb);
}

function moveBomb() {
    if (!bomb) {
        return;
    }

    let bombTop = parseInt(bomb.style.top, 10);
    bombTop -= 8;
    bomb.style.top = `${bombTop}px`;

    if (bombTop < 0) {
        bomb.remove();
        bomb = null;
        return;
    }
}

function moveEnemies() {
    if (gameOver) {
        return;
    }

    let hitEdge = false;

    enemies.forEach((enemy) => {
        if (enemy.health <= 0 || !enemy.element) {
            return;
        }

        enemy.x += enemyDirection * enemySpeed;

        if (enemy.x <= 0 || enemy.x >= boardWidth - 70) {
            hitEdge = true;
        }
    });

    if (hitEdge) {
        enemyDirection *= -1;

        enemies.forEach((enemy) => {
            if (enemy.health > 0 && enemy.element) {
                enemy.y += dropDistance;

                if (enemy.y >= boardHeight - 100) {
                    endGame(false);
                }
            }
        });
    }

    enemies.forEach((enemy) => {
        if (enemy.health > 0 && enemy.element) {
            enemy.element.style.left = `${enemy.x}px`;
            enemy.element.style.top = `${enemy.y}px`;
        }
    });
}

function gameLoop() {
    moveBomb();
    moveEnemies();
}

function selectBomb(value) {
    if (!bombValues.includes(value)) {
        return;
    }

    selectedBomb = value;
    updateSelectedBombDisplay(selectedBomb);
    updateMessage(`Bomb ${value} selected`, "secondary");
}

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowLeft":
            movePlayer(-1);
            break;
        case "ArrowRight":
            movePlayer(1);
            break;
        case " ":
            event.preventDefault();
            fireBomb();
            break;
        case "1":
            selectBomb(1);
            break;
        case "2":
            selectBomb(2);
            break;
        case "3":
            selectBomb(3);
            break;
        case "5":
            selectBomb(5);
            break;
    }
});

restartBtn.addEventListener("click", resetGame);

renderPlayer();
createEnemies();