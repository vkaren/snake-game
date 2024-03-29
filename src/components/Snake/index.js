import SnakeCell from "@components/SnakeCell";

class Snake {
  constructor({ defaultSize }) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.defaultSize = defaultSize;
    this.velocity = { x: 0, y: 0 };
  }

  create() {
    let initialSize = this.defaultSize;

    while (initialSize) {
      this.createCell();
      initialSize--;
    }
  }

  createCell() {
    if (!this.head) {
      this.head = new SnakeCell({ id: this.size, prevCell: null });
      this.tail = this.head;
    } else {
      const newSnakeCell = new SnakeCell({
        id: this.size,
        prevCell: this.tail,
      });

      this.tail.nextCell = newSnakeCell;
      this.tail = newSnakeCell;
    }

    this.tail.paint();
    this.size++;
  }

  move({ event, moveTo }) {
    const moveToValue = this.getMoveToValue({ event, moveTo });

    if (
      !this.velocity.y &&
      (moveToValue === "moveUp" || moveToValue === "moveDown")
    ) {
      const { height: val } = this.head.size;
      const velocity = moveToValue === "moveDown" ? val : -val;

      this.updateVelocity("y", velocity);
    } else if (
      !this.velocity.x &&
      (moveToValue === "moveRight" || moveToValue === "moveLeft")
    ) {
      const { width: val } = this.head.size;
      const velocity = moveToValue === "moveRight" ? val : -val;

      this.updateVelocity("x", velocity);
    }
  }

  getMoveToValue({ event, moveTo }) {
    const validKeys = {
      ArrowUp: "moveUp",
      ArrowDown: "moveDown",
      ArrowRight: "moveRight",
      ArrowLeft: "moveLeft",
    };

    if (!event) {
      return moveTo;
    } else if (event.type === "keydown" && validKeys[event.key]) {
      return validKeys[event.key];
    } else if (event.type === "click") {
      return event.target.className;
    }
  }

  updateVelocity(axis, val) {
    const oppositeAxis = {
      x: "y",
      y: "x",
    };

    this.velocity[axis] += val;
    this.velocity[oppositeAxis[axis]] = 0;
  }

  updatePosition() {
    let snakeCell = this.head;

    while (snakeCell) {
      snakeCell.setOldPosition();
      snakeCell.updateCellPosition(this.velocity);
      snakeCell.paint();

      snakeCell = snakeCell.nextCell;
    }
  }

  hasCollidedWithItself() {
    let snakeHeadPosition = this.head.position;
    let snakeCell = this.head.nextCell;

    while (snakeCell) {
      if (
        snakeHeadPosition.x === snakeCell.position.x &&
        snakeHeadPosition.y === snakeCell.position.y
      ) {
        return true;
      }

      snakeCell = snakeCell.nextCell;
    }

    return false;
  }

  reset() {
    this.size = 0;
    this.head = null;
    this.tail = null;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.create();
  }
}

export default Snake;
