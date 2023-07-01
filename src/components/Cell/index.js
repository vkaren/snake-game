import { fillGameCanvas } from "@utils/globals";

class Cell {
  constructor({ x, y }) {
    this.position = { x, y };
    this.defaultPosition = this.position;
    this.size = {
      width: 20,
      height: 20,
    };
    this.color = "#233311";
  }

  paint() {
    const { x, y } = this.position;
    const { width, height } = this.size;

    const fill = { color: this.color, x, y, width, height };
    fillGameCanvas(fill);
  }
}

export default Cell;
