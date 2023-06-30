import Game from "@pages/Game";

const app = document.querySelector("#app");
const gameCanvas = document.querySelector(".game-canvas");

function playGame() {
  const gamePage = new Game();

  app.replaceChildren(gamePage.render());
}

function fillGameCanvas({ color, x, y, width, height }) {
  gameCanvas.fillStyle = color;
  gameCanvas.fillRect(x, y, width, height);
}

function drawImgGameCanvas({ image, x, y, width, height }) {
  gameCanvas.drawImage(image, x, y, width, height);
}

export { app, gameCanvas, playGame, fillGameCanvas, drawImgGameCanvas };
