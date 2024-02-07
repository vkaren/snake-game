import { app } from "@app";
import Game from "./Game";
import "./styles.css";

class GameLayout extends Game {
  constructor() {
    super();
    this.container = document.createElement("section");
    this.container.setAttribute("class", "game-section");

    /* Move on mobile  */
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;

    this.moveOnMobileStart = this.moveOnMobileStart.bind(this);
    this.moveOnMobileEnd = this.moveOnMobileEnd.bind(this);
  }

  render() {
    const scoreElement = this.createScoreElement();
    const canvas = this.createCanvas();
    const gameOverMsgElement = this.createGameOverMsg();
    const gameButtons = this.createGameButtons();

    this.container.append(
      scoreElement,
      canvas,
      gameOverMsgElement,
      gameButtons
    );

    document.body.addEventListener("keydown", this.moveSnake());

    return this.container;
  }

  createScoreElement() {
    const scoreElement = document.createElement("span");
    scoreElement.setAttribute("class", "game-score");
    scoreElement.textContent = 0;

    return scoreElement;
  }

  createCanvas() {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("class", "game-canvas");
    canvas.setAttribute("width", "300");
    canvas.setAttribute("height", "300");
    canvas.setAttribute("tabindex", "0");

    canvas.addEventListener("touchstart", this.moveOnMobileStart);
    canvas.addEventListener("touchend", this.moveOnMobileEnd);

    return canvas;
  }

  createGameOverMsg() {
    const gameOverMsgContainer = document.createElement("div");
    gameOverMsgContainer.setAttribute("class", "game-msg hidden");

    const gameOverP = document.createElement("p");
    gameOverP.setAttribute("class", "game-msg--over");
    gameOverP.textContent = "GAME OVER";

    const highScoreP = document.createElement("p");
    highScoreP.setAttribute("class", "game-msg--highScore");
    highScoreP.textContent = "High Score: ";

    const highScoreVal = document.createElement("span");
    highScoreVal.setAttribute("class", "highScore-span");
    highScoreVal.textContent = this.highScore;

    const playAgainBtn = document.createElement("button");
    playAgainBtn.setAttribute("class", "game-msg-playBtn");
    playAgainBtn.textContent = "Play again";

    const backToMenuBtn = document.createElement("button");
    backToMenuBtn.setAttribute("class", "game-msg-backToMenu");
    backToMenuBtn.textContent = "Choose another level";

    playAgainBtn.addEventListener("click", this.playAgain);
    backToMenuBtn.addEventListener("click", app.backToMenuPage);

    highScoreP.append(highScoreVal);
    gameOverMsgContainer.append(
      gameOverP,
      highScoreP,
      playAgainBtn,
      backToMenuBtn
    );

    return gameOverMsgContainer;
  }

  createGameButtons() {
    const buttonsValue = {
      moveUp: "↑",
      moveDown: "↓",
      moveLeft: "←",
      moveRight: "→",
    };
    const container = document.createElement("div");
    container.setAttribute("class", "game-btns");

    for (let key in buttonsValue) {
      const button = document.createElement("button");

      button.setAttribute("class", key);
      button.textContent = buttonsValue[key];
      button.addEventListener("click", this.moveSnake());

      container.append(button);
    }

    return container;
  }

  /* Move on mobile */
  moveOnMobileStart(event) {
    this.touchStartX = event.changedTouches[0].screenX;
    this.touchStartY = event.changedTouches[0].screenY;
  }

  moveOnMobileEnd(event) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.touchEndY = event.changedTouches[0].screenY;

    const x = Math.abs(this.touchStartX - this.touchEndX);
    const y = Math.abs(this.touchStartY - this.touchEndY);

    if (x > y) {
      if (this.touchStartX < this.touchEndX) {
        this.moveSnake({ moveTo: "moveRight" })();
      } else {
        this.moveSnake({ moveTo: "moveLeft" })();
      }
    } else if (y > x) {
      if (this.touchStartY < this.touchEndY) {
        this.moveSnake({ moveTo: "moveDown" })();
      } else {
        this.moveSnake({ moveTo: "moveUp" })();
      }
    }
  }
}

export default GameLayout;
