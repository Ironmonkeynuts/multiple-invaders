const gameBoard = document.getElementById("game-board");
const player = document.getElementById("player");
const restartBtn = document.getElementById("restart-btn");

const boardWidth = 800;
const boardHeight = 500;

let playerX = 370;
const playerSpeed = 20;

let selectedBomb = 1;
let score = 0;
let bomb = null;
let gameOver = false;

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

    checkBombCollision();
}

function checkBombCollision() {
    if (!bomb) {
        return;
    }

    const bombRect = bomb.getBoundingClientRect();

    enemies.forEach((enemy) => {
        if (enemy.health <= 0 || !enemy.element) {
            return;
        }

        const enemyRect = enemy.element.getBoundingClientRect();

        const collision =
            bombRect.left < enemyRect.right &&
            bombRect.right > enemyRect.left &&
            bombRect.top < enemyRect.bottom &&
            bombRect.bottom > enemyRect.top;

        if (collision) {
            const bombValue = parseInt(bomb.dataset.value, 10);
            handleHit(enemy, bombValue);
            bomb.remove();
            bomb = null;
        }
    });
}

function handleHit(enemy, bombValue) {
    const damage = calculateDamage(bombValue, enemy.number);

    if (damage === 0) {
        updateMessage(`${bombValue} is not a factor of ${enemy.number}`, "danger");
        return;
    }

    enemy.health -= damage;

    if (isPrimeFactor(bombValue, enemy.number)) {
        score += 20;
        updateMessage(`Prime factor hit! ${bombValue} is a prime factor of ${enemy.number}`, "success");
    } else {
        score += 10;
        updateMessage(`${bombValue} is a factor of ${enemy.number}`, "info");
    }

    updateScoreDisplay(score);

    if (enemy.health <= 0) {
        score += 50;
        updateScoreDisplay(score);
        enemy.element.remove();
        enemy.element = null;
        updateMessage(`Ship ${enemy.number} destroyed!`, "warning");
        checkWin();
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

function checkWin() {
    const remainingEnemies = enemies.filter((enemy) => enemy.health > 0);

    if (remainingEnemies.length === 0) {
        endGame(true);
    }
}

function endGame(playerWon) {
    gameOver = true;
    updateGameStatus(playerWon ? "You Win!" : "Game Over");

    if (playerWon) {
        updateMessage("You destroyed all the multiple ships!", "success");
    } else {
        updateMessage("A ship reached the danger zone! You lose! Try again.", "danger");
    }
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

function resetGame() {
    enemies.forEach((enemy) => {
        if (enemy.element) {
            enemy.element.remove();
        }
    });

    if (bomb) {
        bomb.remove();
        bomb = null;
    }

    enemies = [
        { id: 1, number: 10, health: 4, x: 60, y: 60, element: null },
        { id: 2, number: 12, health: 4, x: 180, y: 60, element: null },
        { id: 3, number: 20, health: 4, x: 300, y: 60, element: null },
        { id: 4, number: 24, health: 4, x: 420, y: 60, element: null },
        { id: 5, number: 30, health: 4, x: 540, y: 60, element: null }
    ];

    enemyDirection = 1;
    playerX = 370;
    selectedBomb = 1;
    score = 0;
    gameOver = false;

    renderPlayer();
    createEnemies();
    updateScoreDisplay(score);
    updateSelectedBombDisplay(selectedBomb);
    updateGameStatus("Playing");
    updateMessage("New game started!", "info");
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
updateScoreDisplay(score);
updateSelectedBombDisplay(selectedBomb);
setInterval(gameLoop, 30);