import { playGame } from "@utils/globals";
import snakeIcon from "@icons/snake.png";
import "./styles.css";

class Menu {
  constructor() {
    this.container = document.createElement("section");
    this.container.setAttribute("class", "menu-section");
  }

  render() {
    const menuHeader = this.createMenuHeader();
    const playButton = this.createPlayButton();

    this.container.append(menuHeader, playButton);

    return this.container;
  }

  createMenuHeader() {
    const container = document.createElement("div");
    container.setAttribute("class", "menu-header");

    const headerImage = document.createElement("img");
    headerImage.setAttribute("src", snakeIcon);
    headerImage.setAttribute("alt", "snake");
    headerImage.setAttribute("class", "menu-header--img");

    const title = document.createElement("h1");
    title.textContent = "Snake Game";

    container.append(headerImage, title);

    return container;
  }

  createPlayButton() {
    const button = document.createElement("button");
    button.setAttribute("class", "menu-button--play");
    button.textContent = "Play";

    button.addEventListener("click", playGame);

    return button;
  }
}

export default Menu;
