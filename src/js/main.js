import Game from "./game.js";

const $container = document.querySelector(".grid");
const $score = document.querySelector("h3");
let invaderId;

const app = new Game($container, $score, invaderId, 500);
app.createGridAndInvaders();
app.intervalInvaderId();

// Listening user's actions
document.addEventListener("keydown", event => app.handleEvent(event));
document.addEventListener("keyup", event => app.handleEvent(event));
