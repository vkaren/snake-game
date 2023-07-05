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
    let moveToVal;

    const validKeys = {
      ArrowUp: "moveUp",
      ArrowDown: "moveDown",
      ArrowRight: "moveRight",
      ArrowLeft: "moveLeft",
    };

    if (!event) {
      moveToVal = moveTo;
    } else if (event.type === "keydown" && validKeys[event.key]) {
      moveToVal = validKeys[event.key];
    } else if (event.type === "click") {
      moveToVal = event.currentTarget.className;
    }

    if (
      !this.velocity.y &&
      (moveToVal === "moveUp" || moveToVal === "moveDown")
    ) {
      const { height: val } = this.head.size;
      const velocity = moveToVal === "moveDown" ? val : -val;

      this.updateVelocity("y", velocity);
    } else if (
      !this.velocity.x &&
      (moveToVal === "moveRight" || moveToVal === "moveLeft")
    ) {
      const { width: val } = this.head.size;
      const velocity = moveToVal === "moveRight" ? val : -val;

      this.updateVelocity("x", velocity);
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
