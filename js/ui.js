function updateScoreDisplay(score) {
    document.getElementById("score").textContent = score;
}

function updateSelectedBombDisplay(bombValue) {
    document.getElementById("selected-bomb").textContent = bombValue;
}

function updateLivesDisplay(lives) {
    document.getElementById("lives").textContent = lives;
}

function updateGameStatus(status) {
    document.getElementById("game-status").textContent = status;
}

function updateMessage(text, type = "info") {
    const messageBox = document.getElementById("message-box");
    messageBox.textContent = text;
    messageBox.className = `alert alert-${type} py-2 mb-3`;
}

function showOverlay() {
    document.getElementById("start-overlay").classList.remove("hidden");
}

function hideOverlay() {
    document.getElementById("start-overlay").classList.add("hidden");
}