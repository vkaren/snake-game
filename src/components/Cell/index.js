import { app } from "@app";

class Cell {
  constructor(defaultPosition = { x: 140, y: 140 }) {
    this.position = defaultPosition;
    this.defaultPosition = defaultPosition;
    this.size = {
      width: 20,
      height: 20,
    };
    this.color = "#233311";
  }

  paint() {
    const fill = { ...this.position, ...this.size, color: this.color };
    app.fillGameCanvas(fill);
  }
}

export default Cell;
