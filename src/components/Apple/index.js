import { app } from "@app";
import Cell from "@components/Cell";
import appleIcon from "@icons/apple.png";

class Apple extends Cell {
  constructor() {
    super({
      // Set default position
      x: 140,
      y: 40,
    });
    this.image = new Image();
    this.image.src = appleIcon;
  }

  paint() {
    const draw = { ...this.position, ...this.size, image: this.image };

    app.drawImgGameCanvas(draw);
  }

  setNewPosition() {
    this.position = {
      x: this.getRandomPosition(),
      y: this.getRandomPosition(),
    };
  }

  getRandomPosition() {
    const maxCellsOnCanvas = (app.canvasElement.width - this.size.width) / 10;
    const minCellsOnCanvas = 0;
    let randomPosition = Math.floor(
      Math.random() *
        (maxCellsOnCanvas - minCellsOnCanvas - 0 + minCellsOnCanvas) +
        0
    );

    if (randomPosition % 2 !== 0) {
      // If it's odd make it even
      randomPosition -= 1;
    }

    return randomPosition * 10;
  }

  reset() {
    this.position = {
      x: this.defaultPosition.x,
      y: this.defaultPosition.y,
    };
  }
}

export default Apple;
