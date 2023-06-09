import Cell from "@components/Cell";

class SnakeCell extends Cell {
  constructor({ id, prevCell }) {
    super({
      // Set position
      x: prevCell ? prevCell.oldPosition.x : 140,
      y: prevCell ? prevCell.oldPosition.y : 140,
    });
    this.id = id;
    this.oldPosition = {
      x: this.position ? this.position.x : null,
      y: this.position ? this.position.y : null,
    };
    this.nextCell = null;
    this.prevCell = prevCell;
  }

  updateCellPosition(velocity) {
    if (this.id === 0) {
      // Snake head
      this.position.x += velocity.x;
      this.position.y += velocity.y;
    } else {
      this.position.y = this.prevCell.oldPosition.y;
      this.position.x = this.prevCell.oldPosition.x;
    }
  }

  setOldPosition() {
    this.oldPosition.y = this.position.y;
    this.oldPosition.x = this.position.x;
  }
}

export default SnakeCell;
