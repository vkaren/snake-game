class Game {
  constructor() {
    this.container = document.createElement("section");
    this.container.setAttribute("class", "game-section");
  }

  render() {
    const scoreSpan = this.createScoreSpan();
    const canvas = this.createCanvas();
    const gameOverMsg = this.createGameOverMsg();
    const gameButtons = this.createGameButtons();

    this.container.append(scoreSpan, canvas, gameOverMsg, gameButtons);

    return this.container;
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

    //   canvas.addEventListener("keydown", play);

    return canvas;
  }

  createGameOverMsg() {
    const gameOverMsg = document.createElement("div");
    gameOverMsg.setAttribute("class", "game-msg");
    gameOverMsg.setAttribute("class", "hidden");

    const gameOverP = document.createElement("p");
    gameOverP.textContent = "GAME OVER";

    const highScoreP = document.createElement("p");
    highScoreP.textContent = "High Score: ";

    const highScoreVal = document.createElement("span");
    highScoreVal.setAttribute("class", "game-msg--highScore");
    highScoreVal.textContent = "0";

    const playAgainBtn = document.createElement("button");
    playAgainBtn.setAttribute("class", "game-msg-playBtn");
    playAgainBtn.textContent = "Play again";

    //   playAgainBttn.addEventListener("click", this.game.reset);

    highScoreP.append(highScoreVal);
    gameOverMsg.append(gameOverP, highScoreP, playAgainBtn);

    return gameOverMsg;
  }

  createGameButtons() {
    const buttonsValue = {
      ArrowUp: "↑",
      ArrowDown: "↓",
      ArrowLeft: "←",
      ArrowRight: "→",
    };
    const container = document.createElement("div");
    container.setAttribute("class", "game-btns");

    for (let key in buttonsValue) {
      const button = document.createElement("button");

      button.setAttribute("id", key);
      button.textContent = buttonsValue[key];
      // button.addEventListener("click", this.game.moveSnake);

      container.append(button);
    }

    return container;
  }
}

export default Game;
