/*
|--------------------------------------------------------------------------
| Multiple Invaders - Prototype v2
|--------------------------------------------------------------------------
|
| This file controls the main game behaviour.
|
| Responsibilities in this file:
| - storing the game state
| - creating enemy ships
| - moving the player
| - firing bombs
| - detecting collisions
| - applying maths damage rules
| - handling score and lives
| - controlling game start/end
| - running the main game loop
|
| The educational maths logic itself is handled in maths.js
| UI display updates are handled in ui.js
|
|--------------------------------------------------------------------------
*/


/* -----------------------------------------------------------------------
   DOM ELEMENT REFERENCES
   -----------------------------------------------------------------------
   These variables reference important HTML elements so we can manipulate
   them with JavaScript during gameplay.
----------------------------------------------------------------------- */

const gameBoard = document.getElementById("game-board");
const player = document.getElementById("player");
const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");


/* -----------------------------------------------------------------------
   GAME CONSTANTS
   -----------------------------------------------------------------------
   These values define sizes, speeds, and configuration settings.

   Keeping these at the top makes the game easier to tweak later.
----------------------------------------------------------------------- */

const BOARD_WIDTH = 800;
const BOARD_HEIGHT = 500;

const PLAYER_WIDTH = 60;

const ENEMY_WIDTH = 72;
const ENEMY_HEIGHT = 52;

const ENEMY_HEALTH_BAR_OFFSET = 12;

const PLAYER_SPEED = 20;
const BOMB_SPEED = 8;

const ENEMY_SPEED = 1.1;
const ENEMY_DROP_DISTANCE = 22;

const MAX_PLAYER_LIVES = 3;

const STARTING_BOMB = 1;

/* Bomb values the player is allowed to use */
const AVAILABLE_BOMBS = [1, 2, 3, 5];

/* Starting health for each enemy ship */
const STARTING_ENEMY_HEALTH = 4;


/* -----------------------------------------------------------------------
   LEVEL DATA
   -----------------------------------------------------------------------
   Defines the enemy ships for the level.

   Each enemy has:
   - id
   - number displayed on the ship
   - starting x/y position
----------------------------------------------------------------------- */

const LEVEL_ENEMIES = [
    { id: 1, number: 10, x: 60, y: 60 },
    { id: 2, number: 12, x: 180, y: 60 },
    { id: 3, number: 20, x: 300, y: 60 },
    { id: 4, number: 24, x: 420, y: 60 },
    { id: 5, number: 30, x: 540, y: 60 }
];


/* -----------------------------------------------------------------------
   GAME STATE VARIABLES
   -----------------------------------------------------------------------
   These variables track the current state of the game.
----------------------------------------------------------------------- */

/* Player position */
let playerX = 370;

/* Currently selected bomb value */
let selectedBomb = STARTING_BOMB;

/* Player score */
let score = 0;

/* Player lives */
let lives = MAX_PLAYER_LIVES;

/* Currently active bomb object */
let activeBomb = null;

/* Enemy ships */
let enemies = [];

/* Direction enemies move horizontally */
let enemyDirection = 1;

/* Game state flags */
let gameStarted = false;
let gameOver = false;


/* -----------------------------------------------------------------------
   HELPER FUNCTIONS
   -----------------------------------------------------------------------
   Small reusable utilities used by the rest of the code.
----------------------------------------------------------------------- */

/*
Creates a fresh set of enemy objects from LEVEL_ENEMIES.

Each enemy also tracks:
- current health
- DOM element
- health bar element
*/
function createEnemyData() {
    return LEVEL_ENEMIES.map((enemy) => ({
        ...enemy,
        health: STARTING_ENEMY_HEALTH,
        maxHealth: STARTING_ENEMY_HEALTH,
        element: null,
        healthBar: null,
        destroyed: false
    }));
}


/*
Returns all enemies that are still alive.
*/
function getRemainingEnemies() {
    return enemies.filter((enemy) => !enemy.destroyed);
}


/*
Removes the currently active bomb from the game.
*/
function removeActiveBomb() {
    if (activeBomb && activeBomb.element) {
        activeBomb.element.remove();
    }

    activeBomb = null;
}


/* -----------------------------------------------------------------------
   HUD / UI SYNCHRONISATION
   -----------------------------------------------------------------------
   These functions keep the on-screen HUD in sync with the game state.
----------------------------------------------------------------------- */

function syncHud() {
    updateScoreDisplay(score);
    updateSelectedBombDisplay(selectedBomb);
    updateLivesDisplay(lives);
}

function setReadyState() {
    updateGameStatus("Ready");
    updateMessage("Press Start Game to begin.", "info");
}

function setPlayingState() {
    updateGameStatus("Playing");
    updateMessage(`Bomb ${selectedBomb} selected. Destroy the ships!`, "primary");
}


/* -----------------------------------------------------------------------
   PLAYER CONTROL
----------------------------------------------------------------------- */

/*
Render the player position on the board.
*/
function renderPlayer() {
    player.style.left = `${playerX}px`;
}


/*
Move the player left or right.

direction:
-1 = left
+1 = right
*/
function movePlayer(direction) {

    /* Player cannot move before the game starts or after game over */
    if (!gameStarted || gameOver) {
        return;
    }

    playerX += direction * PLAYER_SPEED;

    /* Prevent player leaving the board */
    if (playerX < 0) {
        playerX = 0;
    }

    if (playerX > BOARD_WIDTH - PLAYER_WIDTH) {
        playerX = BOARD_WIDTH - PLAYER_WIDTH;
    }

    renderPlayer();
}


/* -----------------------------------------------------------------------
   ENEMY CREATION AND RENDERING
----------------------------------------------------------------------- */

/*
Create DOM elements for each enemy ship and health bar.
*/
function createEnemyElements() {

    enemies.forEach((enemy) => {

        /* Create ship */
        const enemyElement = document.createElement("div");
        enemyElement.classList.add("enemy");
        enemyElement.textContent = enemy.number;

        /* Create health bar */
        const healthBar = document.createElement("div");
        healthBar.classList.add("enemy-health");

        const healthFill = document.createElement("div");
        healthFill.classList.add("enemy-health-fill");

        healthBar.appendChild(healthFill);

        /* Add to board */
        gameBoard.appendChild(healthBar);
        gameBoard.appendChild(enemyElement);

        enemy.element = enemyElement;
        enemy.healthBar = healthBar;

        renderEnemy(enemy);
        updateEnemyHealthBar(enemy);
    });
}


/*
Update enemy position on screen.
*/
function renderEnemy(enemy) {

    if (enemy.destroyed || !enemy.element) {
        return;
    }

    enemy.element.style.left = `${enemy.x}px`;
    enemy.element.style.top = `${enemy.y}px`;

    enemy.healthBar.style.left = `${enemy.x}px`;
    enemy.healthBar.style.top = `${enemy.y - ENEMY_HEALTH_BAR_OFFSET}px`;
}


/*
Update the width of the health bar based on enemy health.
*/
function updateEnemyHealthBar(enemy) {

    const fill = enemy.healthBar.querySelector(".enemy-health-fill");

    const percentage = (enemy.health / enemy.maxHealth) * 100;

    fill.style.width = `${Math.max(0, percentage)}%`;
}


/*
Small visual feedback when a ship is hit.
*/
function flashEnemy(enemy) {

    enemy.element.classList.add("hit");

    setTimeout(() => {
        enemy.element.classList.remove("hit");
    }, 120);
}


/*
Handle enemy destruction animation and cleanup.
*/
function destroyEnemy(enemy) {

    enemy.destroyed = true;

    enemy.element.classList.add("destroyed");

    enemy.healthBar.remove();

    setTimeout(() => {
        enemy.element.remove();
    }, 180);
}


/* -----------------------------------------------------------------------
   ENEMY MOVEMENT
----------------------------------------------------------------------- */

function moveEnemies() {

    if (!gameStarted || gameOver) {
        return;
    }

    let hitEdge = false;

    getRemainingEnemies().forEach((enemy) => {

        enemy.x += enemyDirection * ENEMY_SPEED;

        /* Detect screen edge */
        if (enemy.x <= 0 || enemy.x >= BOARD_WIDTH - ENEMY_WIDTH) {
            hitEdge = true;
        }
    });

    /*
    If any enemy hits the edge:
    - reverse direction
    - drop downward
    */
    if (hitEdge) {

        enemyDirection *= -1;

        getRemainingEnemies().forEach((enemy) => {

            enemy.y += ENEMY_DROP_DISTANCE;

            /* If enemies descend too far the player loses a life */
            if (enemy.y + ENEMY_HEIGHT >= BOARD_HEIGHT - 80) {
                loseLife();
            }
        });
    }

    /* Update visual positions */
    getRemainingEnemies().forEach(renderEnemy);
}


/* -----------------------------------------------------------------------
   BOMB SYSTEM
----------------------------------------------------------------------- */

/*
Change the selected bomb value.
*/
function selectBomb(bombValue) {

    if (!AVAILABLE_BOMBS.includes(bombValue) || gameOver) {
        return;
    }

    selectedBomb = bombValue;

    updateSelectedBombDisplay(selectedBomb);

    if (gameStarted) {
        updateMessage(`Bomb ${bombValue} selected`, "secondary");
    }
}


/*
Fire a bomb from the player position.
*/
function fireBomb() {

    if (!gameStarted || gameOver || activeBomb) {
        return;
    }

    const bombElement = document.createElement("div");
    bombElement.classList.add("bomb");

    bombElement.textContent = selectedBomb;

    const startX = playerX + 22;
    const startY = BOARD_HEIGHT - 50;

    bombElement.style.left = `${startX}px`;
    bombElement.style.top = `${startY}px`;

    gameBoard.appendChild(bombElement);

    activeBomb = {
        value: selectedBomb,
        x: startX,
        y: startY,
        element: bombElement
    };
}


/*
Move bomb upward each frame.
*/
function moveBomb() {

    if (!activeBomb) {
        return;
    }

    activeBomb.y -= BOMB_SPEED;

    activeBomb.element.style.top = `${activeBomb.y}px`;

    /* Remove bomb if it leaves screen */
    if (activeBomb.y < 0) {
        removeActiveBomb();
        return;
    }

    checkBombCollisions();
}


/* -----------------------------------------------------------------------
   COLLISION DETECTION
----------------------------------------------------------------------- */

/*
Detect if bomb overlaps enemy.
*/
function isCollision(bombObj, enemy) {

    const bombLeft = bombObj.x;
    const bombRight = bombObj.x + 16;

    const bombTop = bombObj.y;
    const bombBottom = bombObj.y + 24;

    const enemyLeft = enemy.x;
    const enemyRight = enemy.x + ENEMY_WIDTH;

    const enemyTop = enemy.y;
    const enemyBottom = enemy.y + ENEMY_HEIGHT;

    return (
        bombLeft < enemyRight &&
        bombRight > enemyLeft &&
        bombTop < enemyBottom &&
        bombBottom > enemyTop
    );
}


/*
Apply maths damage rules when a bomb hits an enemy.
*/
function handleEnemyHit(enemy, bombValue) {

    const damage = calculateDamage(bombValue, enemy.number);

    /* Bomb is not a factor */
    if (damage === 0) {
        updateMessage(`${bombValue} is not a factor of ${enemy.number}`, "danger");
        return;
    }

    enemy.health -= damage;

    flashEnemy(enemy);

    updateEnemyHealthBar(enemy);

    /* Update score and message */
    if (isPrimeFactor(bombValue, enemy.number)) {

        score += 20;

        updateMessage(
            `Prime factor hit! ${bombValue} is a prime factor of ${enemy.number}`,
            "success"
        );

    } else {

        score += 10;

        updateMessage(`${bombValue} is a factor of ${enemy.number}`, "info");
    }

    updateScoreDisplay(score);

    /* Destroy ship if health reaches zero */
    if (enemy.health <= 0) {

        score += 50;

        updateScoreDisplay(score);

        destroyEnemy(enemy);

        updateMessage(`Ship ${enemy.number} destroyed!`, "warning");

        checkWinCondition();
    }
}


/*
Check bomb against every enemy.
*/
function checkBombCollisions() {

    for (const enemy of getRemainingEnemies()) {

        if (isCollision(activeBomb, enemy)) {

            handleEnemyHit(enemy, activeBomb.value);

            removeActiveBomb();

            break;
        }
    }
}


/* -----------------------------------------------------------------------
   GAME FLOW
----------------------------------------------------------------------- */

function loseLife() {

    lives -= 1;

    updateLivesDisplay(lives);

    removeActiveBomb();

    if (lives <= 0) {
        endGame(false);
        return;
    }

    updateMessage("A ship broke through! You lost a life.", "danger");

    resetWavePositions();
}


function checkWinCondition() {

    if (getRemainingEnemies().length === 0) {
        endGame(true);
    }
}


function endGame(playerWon) {

    gameOver = true;

    removeActiveBomb();

    if (playerWon) {

        updateGameStatus("You Win!");

        updateMessage(
            "You destroyed all the multiple ships!",
            "success"
        );

    } else {

        updateGameStatus("Game Over");

        updateMessage(
            "You have lost all your lives.",
            "danger"
        );
    }

    showOverlay();
}


function startGame() {

    gameStarted = true;

    gameOver = false;

    hideOverlay();

    setPlayingState();
}


function resetGame() {

    removeActiveBomb();

    enemies.forEach((enemy) => {

        if (enemy.element) {
            enemy.element.remove();
        }

        if (enemy.healthBar) {
            enemy.healthBar.remove();
        }
    });

    enemies = createEnemyData();

    enemyDirection = 1;

    playerX = 370;

    selectedBomb = STARTING_BOMB;

    score = 0;

    lives = MAX_PLAYER_LIVES;

    gameStarted = false;

    gameOver = false;

    renderPlayer();

    createEnemyElements();

    syncHud();

    setReadyState();

    showOverlay();
}


/* -----------------------------------------------------------------------
   MAIN GAME LOOP
----------------------------------------------------------------------- */

function gameLoop() {

    moveBomb();

    moveEnemies();
}


/* -----------------------------------------------------------------------
   EVENT LISTENERS
----------------------------------------------------------------------- */

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


startButton.addEventListener("click", startGame);

restartButton.addEventListener("click", resetGame);


/* -----------------------------------------------------------------------
   INITIAL GAME SETUP
----------------------------------------------------------------------- */

resetGame();

/* Run the game loop ~33 times per second */
setInterval(gameLoop, 30);