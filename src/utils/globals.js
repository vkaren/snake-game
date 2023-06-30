const app = document.querySelector("#app");

function GameStart() {
  this.hasGameStarted = false;
}
GameStart.prototype.setGameStarted = function () {
  this.hasGameStarted = true;
};

const gameStart = new GameStart();

export { app, gameStart };
