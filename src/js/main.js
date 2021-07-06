import _ from "lodash";
import Game from "./game.js";

const $buttons = document.querySelectorAll(".nav");
const $container = document.querySelector(".grid");
const $score = document.querySelector("h3");
let invaderId;
const levels = [500, 250, 150, 80];

// Set more accessibility on buttons of nav
$buttons.forEach(button => button.setAttribute("tabindex", "0"));

// Lauch game depending level's choice of user
for(let i = 0; i < levels.length; i ++){

    $buttons[i].addEventListener("click", () =>{
        
        $container.innerHTML = "";
        $score.innerHTML = "Score : --";
        // Build and lauch game
        const app = new Game($container, $score, invaderId, levels[i]);
        app.buildGridAndInvadersAndDefender();
        app.intervalInvaderId();
        // Listening user's actions
        document.addEventListener("keydown", event => app.handleEvent(event));
        document.addEventListener("keyup", event => app.handleEvent(event));
    
    });

}

// Add current year on thoe footer
const $year = document.querySelector("#year");
const date = new Date(Date.now());
$year.textContent = `${date.getFullYear()}`;