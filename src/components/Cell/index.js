import { fillGameCanvas } from "@utils/globals";

class Cell {
  constructor(position) {
    this.position = position;
    this.size = {
      width: 20,
      height: 20,
    };
    this.color = "#233311";
  }

  paint() {
    const x = this.position.x;
    const y = this.position.y;
    const { width, height } = this.size;

    const fill = { color: this.color, x, y, width, height };
    fillGameCanvas(fill);
  }
}

export default Cell;
