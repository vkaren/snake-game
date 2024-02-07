import { app } from "@app";
import Snake from "@components/Snake";
import Apple from "@components/Apple";

class Game {
  constructor() {
    this.snake = null;
    this.apple = new Apple();
    this.speed = null;
    this.isGameOver = false;
    this.score = 0;
    this.highScore = localStorage.getItem("highScore") || 0;
    this.interval = null;

    this.moveSnake = this.moveSnake.bind(this);
    this.paintCanvas = this.paintCanvas.bind(this);
    this.playAgain = this.playAgain.bind(this);
  }

  start(chosenLevel) {
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
    let debounceTimer = null;

    return (event) => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      debounceTimer = setTimeout(() => {
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
      this.updateScore();
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
      this.stopInterval();
      this.getHighScore();
      app.toggleGameOverMsg();
    }
  }

  updateScore() {
    this.score++;
    app.updateScoreElement(this.score); // !!
  }

  stopInterval() {
    clearInterval(this.interval);
    this.interval = null;
  }

  getHighScore() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem("highScore", this.highScore);
      app.updateHighScoreElement(this.highScore);
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
}

export default Game;
