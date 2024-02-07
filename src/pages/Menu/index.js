import { app } from "@app";
import snakeIcon from "@icons/snake.png";
import "./styles.css";

class Menu {
  constructor() {
    this.container = document.createElement("section");
    this.container.setAttribute("class", "menu-section");

    this.gameLevels = ["Easy", "Normal", "Hard"];
  }

  render() {
    const menuHeader = this.createMenuHeader();
    const levelsForm = this.createLevelsForm();

    this.container.append(menuHeader, levelsForm);

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
    title.textContent = "Snake";

    container.append(headerImage, title);

    return container;
  }

  createLevelsForm() {
    const form = document.createElement("form");
    form.setAttribute("class", "menu-levelsForm");

    const title = document.createElement("h2");
    title.textContent = "Choose a level:";

    const optionsContainer = document.createElement("div");
    optionsContainer.setAttribute("class", "menu-levelsForm--options");

    this.gameLevels.forEach((level) => {
      const label = document.createElement("label");
      label.setAttribute("class", "levelsForm-option--label");
      label.setAttribute("for", level.toLowerCase());

      const option = document.createElement("input");
      option.setAttribute("class", "levelsForm-option--input");
      option.setAttribute("id", level.toLowerCase());
      option.setAttribute("name", "levelOption");
      option.setAttribute("type", "radio");
      option.setAttribute("value", level.toLowerCase());
      option.setAttribute("autocomplete", "off");

      const optionTitle = document.createElement("span");
      optionTitle.setAttribute("class", "levelsForm-option--title");
      optionTitle.textContent = level;

      label.append(optionTitle);
      optionsContainer.append(option, label);
    });

    const playBtn = document.createElement("button");
    playBtn.setAttribute("class", "menu-button--play");
    playBtn.setAttribute("type", "submit");
    playBtn.textContent = "Play";

    playBtn.addEventListener("click", app.playGame);

    form.append(title, optionsContainer, playBtn);

    return form;
  }
}

export default Menu;
