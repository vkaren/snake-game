import Cell from "@components/Cell";
import { drawImgGameCanvas, gameCanvas } from "@utils/globals";
import appleIcon from "@icons/apple.png";

class Apple extends Cell {
  constructor() {
    super({
      // Set position
      x: 140,
      y: 40,
    });
    this.image = new Image();
    this.image.src = appleIcon;
  }

  paint() {
    const x = this.position.x;
    const y = this.position.y;
    const { width, height } = this.size;

    const draw = { image: this.image, x, y, width, height };

    drawImgGameCanvas(draw);
  }

  setNewPosition() {
    this.position = {
      x: this.getRandomPosition(),
      y: this.getRandomPosition(),
    };
  }

  getRandomPosition() {
    const maxCellsOnCanvas = (gameCanvas.width - this.size.width) / 10;
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
}

export default Apple;
