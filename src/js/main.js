import Game from "./game.js";

const $container = document.querySelector(".grid");
const $score = document.querySelector("h3");
let invaderId;

const app = new Game($container, $score, invaderId);
app.createGridAndInvaders();
app.intervalInvaderId();

/**
 * Move the defender on the container of game
 * @param {Object} event 
 */
const movedefender = (event) => {

    event.preventDefault();

    app.allDivs[app.defenderPosition].classList.remove("defender");

    switch (event.code) {
        case "ArrowLeft":
            if(app.defenderPosition > 220) app.defenderPosition -= 1;
            break;
        case "ArrowRight":
            if(app.defenderPosition < 239) app.defenderPosition += 1;
            break;
        default:
            console.log("Autre opération");
            break;
    }

    app.allDivs[app.defenderPosition].classList.add("defender");
  
}
// Listening event of user's keydown in order to move defender
document.addEventListener("keydown", movedefender);

/**
 * Allow user to shoot invaders
 * @param {Object} event 
 */
const fire = (event) => {

    event.preventDefault();

    let laserId;
    let currentLaser = app.defenderPosition; 

    const moveFire = () => {

        app.allDivs[currentLaser].classList.remove("laser");
        currentLaser -= app.width;
        app.allDivs[currentLaser].classList.add("laser");

        if(app.allDivs[currentLaser].classList.contains("invader")){
            
            app.allDivs[currentLaser].classList.remove("laser");
            app.allDivs[currentLaser].classList.remove("invader");
            app.allDivs[currentLaser].classList.add("boom");

            app.destroyedInvaders === 36 ?(
                $score.innerHTML = `Score : ${app.displayScore()} <br> <span id="victory"><i class="fas fa-trophy"></i> Bravo ! Vous avez gagné <i class="fas fa-trophy"></i></span>`,
                clearInterval(app.invaderId)
            ):(
                $score.innerHTML = `Score : ${app.displayScore()}`
            );
            
            app.invaders = app.invaders.filter(invader => invader !== currentLaser);

            setTimeout(() => app.allDivs[currentLaser].classList.remove("boom"), 250);

            clearInterval(laserId);
        }

        if(currentLaser < app.width){
            
            clearInterval(laserId);
            setTimeout(() => app.allDivs[currentLaser].classList.remove("laser"), 100);

        }
    }
    
    if(event.code === "Space"){
        laserId = setInterval(() => moveFire(), 100);
    }

}
// Listening keyup event from user when s/he's shooting
document.addEventListener("keyup", fire);