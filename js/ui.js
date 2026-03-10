function updateScoreDisplay(score) {
    document.getElementById("score").textContent = score;
}

function updateSelectedBombDisplay(value) {
    document.getElementById("selected-bomb").textContent = value;
}

function updateMessage(text, type = "info") {
    const messageBox = document.getElementById("message-box");
    messageBox.textContent = text;
    messageBox.className = `alert alert-${type} py-2`;
}

function updateGameStatus(status) {
    document.getElementById("game-status").textContent = status;
}