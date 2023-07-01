import Game from "@pages/Game";

const app = document.querySelector("#app");
let canvasElem;
let gameCanvas;
let score;
let highScore;
let gameMsg;

function playGame() {
  const gamePage = new Game({ speed: 200 });

  app.replaceChildren(gamePage.render());

  // Getting the canvas and other elements after rendering the game
  canvasElem = document.querySelector(".game-canvas");
  gameCanvas = canvasElem.getContext("2d");
  score = document.querySelector(".game-score");
  gameMsg = document.querySelector(".game-msg");
  highScore = document.querySelector(".highScore-span");

  // Creating the snake and the apple in canvas
  gamePage.play();
}

function fillGameCanvas({ color, x, y, width, height }) {
  gameCanvas.fillStyle = color;
  gameCanvas.fillRect(x, y, width, height);
}

function drawImgGameCanvas({ image, x, y, width, height }) {
  gameCanvas.drawImage(image, x, y, width, height);
}

function clearGameCanvas() {
  gameCanvas.clearRect(0, 0, canvasElem.width, canvasElem.height);
}

function updateScore(val) {
  score.textContent = val;
}

function updateHighScore(val) {
  highScore.textContent = val;
}

function toggleGameOverMsg() {
  if (gameMsg.classList.contains("hidden")) {
    gameMsg.classList.remove("hidden");
  } else {
    gameMsg.classList.add("hidden");
  }
}

export {
  app,
  canvasElem,
  gameCanvas,
  playGame,
  fillGameCanvas,
  drawImgGameCanvas,
  clearGameCanvas,
  updateScore,
  updateHighScore,
  toggleGameOverMsg,
};
