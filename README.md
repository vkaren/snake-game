# Snake game

_Game menu_

<img src="./readme_imgs/snake_game_menu.png" width="200px" align="center">

_Play section_

<img src="./readme_imgs/snake_game_play.png" width="200px" align="center">

_Game over_

<img src="./readme_imgs/snake_game_end.png" width="200px" align="center">

This project was made with vanilla js and webpack

## How works?

The main file adds the rendering of the Menu page to the #app element

_src/index.js_

<img src="./readme_imgs/mainFile.PNG" width="200px" align="center">

On the Menu page a form is created to choose a level game, by clicking the play button the function playGame is invoked. This function replaces the Menu page with the Game page and gets the necessary elements to make the game work and invoke the play method of the Game page

_src/utils/globals.js_
<img src="./readme_imgs/playGameFunction.PNG" width="200px" align="center">

This play method creates and sets the game speed according to the chosen level and invokes the moveSnake method to automatically move at the start of the game

_src/pages/Game_

<img src="./readme_imgs/Game_play.PNG" width="200px" align="center">

For the snake movement some event listeners are set and all of them invokes moveSnake

- keydown
- touchstart, touchend (Swipe on touchscreens)
- click

The moveSnake method updates which axis of canvas the snake is moving through the Snake component's move method, also updates the position and checks if the snake collides with the apple or if the game is over through its paintCanvas method, and sets a time interval depending on game speed to call paintCanvas again

_src/pages/Game_

<img src="./readme_imgs/Game_moveSnake.PNG" width="200px" align="center">

The Snake component is based on a double linked list, where each node is a SnakeCell component and updates its position on the canvas depending of the position that its previous cell occupied, except for the head cell that updates its position by which axis the snake is moving (Snake.velocity)

_src/components/Snake_

<img src="./readme_imgs/Snake.PNG" width="200px" align="center">

_src/components/SnakeCell_

<img src="./readme_imgs/SnakeCell.PNG" width="200px" align="center">

When the snake collides with an apple, it updates its position depending on the number of cells that the canvas has, and if it collides with some edge or with itself the game ends, showing a game over message with the highest score obtained

_src/pages/Game_

<img src="./readme_imgs/Game_checkCollisionWithApple.PNG" width="200px" align="center">

_src/pages/Apple_

<img src="./readme_imgs/Apple.PNG" width="200px" align="center">

_src/pages/Game_

<img src="./readme_imgs/Game_checkGameOver.PNG" width="200px" align="center">

_src/pages/Snake_

<img src="./readme_imgs/Snake_hasCollideWithItself.PNG" width="200px" align="center">

The highest score will be save in local storage, in case the user wants it to break his own record

_src/pages/Game_

<img src="./readme_imgs/Game_getHighScore.PNG" width="200px" align="center">
