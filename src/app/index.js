import Menu from "@pages/Menu";
import Game from "@pages/Game";

class App {
  constructor() {
    this.container = document.querySelector("#app");
    this.canvasElement = null;
    this.gameCanvas = null;
    this.scoreElement = null;
    this.highScoreElement = null;
    this.gameMsgElement = null;
  }

  playGame = (event) => {
    event.preventDefault();

    const form = document.querySelector(".menu-levelsForm");
    const formData = new FormData(form);
    const chosenLevel = formData.get("levelOption");

    if (chosenLevel) {
      const gamePage = new Game();

      this.container.replaceChildren(gamePage.render());

      // Getting the canvas and other elements after rendering the game
      this.canvasElement = document.querySelector(".game-canvas");
      this.gameCanvas = this.canvasElement.getContext("2d");
      this.scoreElement = document.querySelector(".game-score");
      this.gameMsgElement = document.querySelector(".game-msg");
      this.highScoreElement = document.querySelector(".highScore-span");

      // Creating the snake and the apple in canvas
      gamePage.play(chosenLevel);
    }
  };

  fillGameCanvas = ({ color, x, y, width, height }) => {
    this.gameCanvas.fillStyle = color;
    this.gameCanvas.fillRect(x, y, width, height);
  };

  drawImgGameCanvas = ({ image, x, y, width, height }) => {
    this.gameCanvas.drawImage(image, x, y, width, height);
  };

  clearGameCanvas = () => {
    this.gameCanvas.clearRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
  };

  updateScoreElement = (val) => {
    this.scoreElement.textContent = val;
  };

  updateHighScoreElement = (val) => {
    this.highScoreElement.textContent = val;
  };

  toggleGameOverMsg = () => {
    this.gameMsgElement.classList.toggle("hidden");
  };

  backToMenuPage = () => {
    const menuPage = new Menu();

    this.container.replaceChildren(menuPage.render());
  };
}

export const app = new App();
