import Game from "./game.js";

const $buttons = document.querySelectorAll(".nav");
const level = [500, 250, 150];
const $container = document.querySelector(".grid");
const $score = document.querySelector("h3");
let invaderId;

// Set more accessibility on buttons of nav
$buttons.forEach(button => button.setAttribute("tabindex", "0"));

for(let i = 0; i < level.length; i ++){

    $buttons[i].addEventListener("click", () =>{
        
        $container.innerHTML = "";
        $score.innerHTML = "Score : --";
        // Build and lauch game
        const app = new Game($container, $score, invaderId, level[i]);
        app.buildGridAndInvadersAndDefender();
        app.intervalInvaderId();
        // Listening user's actions
        document.addEventListener("keydown", event => app.handleEvent(event));
        document.addEventListener("keyup", event => app.handleEvent(event));
    
    });

}