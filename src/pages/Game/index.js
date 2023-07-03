import Snake from "@components/Snake";
import Apple from "@components/Apple";
import {
  clearGameCanvas,
  updateScore,
  canvasElem,
  toggleGameOverMsg,
  updateHighScore,
} from "@utils/globals";
import "./styles.css";

class Game {
  constructor({ speed }) {
    this.container = document.createElement("section");
    this.container.setAttribute("class", "game-section");

    this.snake = new Snake({ defaultSize: 3 });
    this.apple = new Apple();
    this.speed = speed;
    this.isGameOver = false;
    this.score = 0;
    this.highScore = localStorage.getItem("highScore") || 0;
    this.interval = null;

    this.moveSnake = this.moveSnake.bind(this);
    this.paintCanvas = this.paintCanvas.bind(this);
    this.playAgain = this.playAgain.bind(this);
  }

  render() {
    const scoreSpan = this.createScoreSpan();
    const canvas = this.createCanvas();
    const gameOverMsg = this.createGameOverMsg();
    const gameButtons = this.createGameButtons();

    this.container.append(scoreSpan, canvas, gameOverMsg, gameButtons);

    return this.container;
  }

  play() {
    this.snake.create();
    this.apple.paint();
  }

  moveSnake(event) {
    if (!this.isGameOver) {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.snake.move(event);
      this.paintCanvas();
      this.interval = setInterval(this.paintCanvas, this.speed);
    }
  }

  paintCanvas() {
    clearGameCanvas();
    this.snake.updatePosition();
    this.apple.paint();
    this.checkCollisionWithApple();
    this.checkGameOver();
  }

  checkCollisionWithApple() {
    if (
      this.snake.head.position.x === this.apple.position.x &&
      this.snake.head.position.y === this.apple.position.y
    ) {
      this.score++;
      updateScore(this.score);

      this.snake.createCell(); // The snake grows
      this.apple.setNewPosition();
    }
  }

  checkGameOver() {
    const snakeHead = this.snake.head;
    const snakeHeadPosition = snakeHead.position;
    const borderStart = 0;
    const borderEnd = canvasElem.width - snakeHead.size.width;

    // If snake head collides with a border or with itself
    if (
      snakeHeadPosition.x < borderStart ||
      snakeHeadPosition.x > borderEnd ||
      snakeHeadPosition.y < borderStart ||
      snakeHeadPosition.y > borderEnd ||
      this.snake.hasCollidedWithItself()
    ) {
      this.isGameOver = true;

      clearInterval(this.interval);
      this.getHighScore();
      toggleGameOverMsg();
    }
  }

  getHighScore() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem("highScore", this.highScore);
    }

    updateHighScore(this.highScore);
  }

  playAgain() {
    clearGameCanvas();
    this.score = 0;
    this.isGameOver = false;
    this.snake.reset();
    this.apple.reset();
    updateScore(this.score);
    toggleGameOverMsg();
  }

  createScoreSpan() {
    const scoreSpan = document.createElement("span");
    scoreSpan.setAttribute("class", "game-score");
    scoreSpan.textContent = 0;

    return scoreSpan;
  }

  createCanvas() {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("class", "game-canvas");
    canvas.setAttribute("width", "300");
    canvas.setAttribute("height", "300");
    canvas.setAttribute("tabindex", "0");

    canvas.addEventListener("keydown", this.moveSnake);

    return canvas;
  }

  createGameOverMsg() {
    const gameOverMsg = document.createElement("div");
    gameOverMsg.setAttribute("class", "game-msg hidden");

    const gameOverP = document.createElement("p");
    gameOverP.setAttribute("class", "game-msg--over");
    gameOverP.textContent = "GAME OVER";

    const highScoreP = document.createElement("p");
    highScoreP.setAttribute("class", "game-msg--highScore");
    highScoreP.textContent = "High Score: ";

    const highScoreVal = document.createElement("span");
    highScoreVal.setAttribute("class", "highScore-span");
    highScoreVal.textContent = "0";

    const playAgainBtn = document.createElement("button");
    playAgainBtn.setAttribute("class", "game-msg-playBtn");
    playAgainBtn.textContent = "Play again";

    playAgainBtn.addEventListener("click", this.playAgain);

    highScoreP.append(highScoreVal);
    gameOverMsg.append(gameOverP, highScoreP, playAgainBtn);

    return gameOverMsg;
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
      button.addEventListener("click", this.moveSnake);

      container.append(button);
    }

    return container;
  }
}

export default Game;
