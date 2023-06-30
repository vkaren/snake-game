import Game from "@pages/Game";

const app = document.querySelector("#app");
let gameCanvas;

function playGame() {
  const gamePage = new Game();

  app.replaceChildren(gamePage.render());

  let canvasElem = document.querySelector(".game-canvas");
  gameCanvas = canvasElem.getContext("2d");
}

function fillGameCanvas({ color, x, y, width, height }) {
  gameCanvas.fillStyle = color;
  gameCanvas.fillRect(x, y, width, height);
}

function drawImgGameCanvas({ image, x, y, width, height }) {
  gameCanvas.drawImage(image, x, y, width, height);
}

export { app, gameCanvas, playGame, fillGameCanvas, drawImgGameCanvas };
