import { app } from "@app";
import Snake from "@components/Snake";
import Apple from "@components/Apple";
import "./styles.css";

// !!separate game logic from dom render
class Game {
  constructor() {
    this.container = document.createElement("section");
    this.container.setAttribute("class", "game-section");

    this.snake = null;
    this.apple = new Apple();
    this.speed = null;
    this.isGameOver = false;
    this.score = 0;
    this.highScore = localStorage.getItem("highScore") || 0;
    this.interval = null;

    /* Move on mobile  */
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;

    this.moveSnake = this.moveSnake.bind(this);
    this.paintCanvas = this.paintCanvas.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.moveOnMobileStart = this.moveOnMobileStart.bind(this);
    this.moveOnMobileEnd = this.moveOnMobileEnd.bind(this);
  }

  render() {
    const scoreSpan = this.createScoreSpan();
    const canvas = this.createCanvas();
    const gameOverMsg = this.createGameOverMsg();
    const gameButtons = this.createGameButtons();

    this.container.append(scoreSpan, canvas, gameOverMsg, gameButtons);

    document.body.addEventListener("keydown", this.moveSnake());

    return this.container;
  }

  play(chosenLevel) {
    switch (chosenLevel) {
      case "easy":
        this.speed = 200;
        this.snake = new Snake({ defaultSize: 3 });
        break;
      case "normal":
        this.speed = 150;
        this.snake = new Snake({ defaultSize: 5 });
        break;
      case "hard":
        this.speed = 100;
        this.snake = new Snake({ defaultSize: 8 });
        break;
    }

    this.snake.create();
    this.apple.paint();
    this.moveSnake({ moveTo: "moveUp" })();
  }

  moveSnake({ moveTo } = {}) {
    let timer = null;

    return (event) => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      timer = setTimeout(() => {
        if (!this.isGameOver) {
          this.snake.move({ event, moveTo });

          if (!this.interval) {
            this.paintCanvas();
            this.interval = setInterval(this.paintCanvas, this.speed);
          }
        }
      }, 150);
    };
  }

  paintCanvas() {
    app.clearGameCanvas();
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
      app.updateScoreElement(this.score); // !!

      this.snake.createCell(); // The snake grows
      this.apple.setNewPosition();
    }
  }

  checkGameOver() {
    const snakeHead = this.snake.head;
    const snakeHeadPosition = snakeHead.position;
    const borderStart = 0;
    const borderEnd = app.canvasElement.width - snakeHead.size.width;

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
      this.interval = null;
      this.getHighScore();
      app.toggleGameOverMsg();
    }
  }

  getHighScore() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem("highScore", this.highScore);
      app.updateHighScoreElement(this.highScore); //!!
    }
  }

  playAgain() {
    app.clearGameCanvas();
    this.score = 0;
    this.isGameOver = false;
    this.snake.reset();
    this.apple.reset();
    app.updateScoreElement(this.score);
    app.toggleGameOverMsg();
    this.moveSnake({ moveTo: "moveUp" })();
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

  /* Creating DOM Elements  */
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

    canvas.addEventListener("touchstart", this.moveOnMobileStart);
    canvas.addEventListener("touchend", this.moveOnMobileEnd);

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
    highScoreVal.textContent = this.highScore;

    const playAgainBtn = document.createElement("button");
    playAgainBtn.setAttribute("class", "game-msg-playBtn");
    playAgainBtn.textContent = "Play again";

    const backToMenuBtn = document.createElement("button");
    backToMenuBtn.setAttribute("class", "game-msg-backToMenu");
    backToMenuBtn.textContent = "Choose another level";

    playAgainBtn.addEventListener("click", this.playAgain);
    backToMenuBtn.addEventListener("click", app.backToMenu);

    highScoreP.append(highScoreVal);
    gameOverMsg.append(gameOverP, highScoreP, playAgainBtn, backToMenuBtn);

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
      button.addEventListener("click", this.moveSnake());

      container.append(button);
    }

    return container;
  }
}

export default Game;
