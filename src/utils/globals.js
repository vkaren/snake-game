import Game from "@pages/Game";

const app = document.querySelector("#app");

function playGame() {
  const gamePage = new Game();

  app.replaceChildren(gamePage.render());
}

export { app, playGame };
