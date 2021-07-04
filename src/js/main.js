const $container = document.querySelector(".grid");
const $score = document.querySelector("h3");

let allDivs;
let invaders = [];
let defenderPosition = 229;
let direction = 1;
let width = 20;
let destroyedInvaders = 1;

const displayScore = () => {
    return destroyedInvaders < 10 ?  
    `0${destroyedInvaders ++}`:
    destroyedInvaders ++;
} ;

const createGridAndInvaders = () => {
    
    let indexAttr = 0;

        for(let i = 0; i < 240; i++){
            
            if(indexAttr === 0){
                
                const block = document.createElement("div");
                block.setAttribute("data-left", "true");
                $container.appendChild(block);
                indexAttr ++;

            } else if(indexAttr === 19){

                const block = document.createElement("div");
                block.setAttribute("data-right", "true");
                $container.appendChild(block);
                indexAttr = 0;

            } else {

                const block = document.createElement("div");
                $container.appendChild(block);
                indexAttr ++;

            }

        }

        for(let i = 1; i < 53; i++){
            
            switch (i) {
                case 13:
                    i = 21;
                    invaders.push(i);
                    break;
                case 33:
                    i = 41;
                    invaders.push(i);
                    break;
                default:
                    invaders.push(i);
                    break;
            }

        }
        
        allDivs = document.querySelectorAll(".grid div");
        
        invaders.forEach( invader => allDivs[invader].classList.add("invader") );

        allDivs[defenderPosition].classList.add("defender");
        
}

createGridAndInvaders();

const movedefender = (event) => {

    event.preventDefault();

    allDivs[defenderPosition].classList.remove("defender");

    switch (event.code) {
        case "ArrowLeft":
            if(defenderPosition > 220) defenderPosition -= 1;
            break;
        case "ArrowRight":
            if(defenderPosition < 239) defenderPosition += 1;
            break;
        default:
            console.log("Autre opération");
            break;
    }

    allDivs[defenderPosition].classList.add("defender");
}

document.addEventListener("keydown", movedefender);

let getDownLeft = true;
let getDownRight = true;

const moveInvaders = () => {

    for(let i = 0; i < invaders.length; i++){
      
        if(allDivs[invaders[i]].getAttribute("data-right") === "true"){
          
            if(getDownRight){

              direction = 20;
              setTimeout(() => getDownRight = false, 50);

            } else if(!getDownRight){

              direction = -1;
            }

            getDownLeft= true;

        } else if(allDivs[invaders[i]].getAttribute("data-left") === "true"){

            if(getDownLeft){

                direction = 20;
                setTimeout(() => getDownLeft = false, 50);

            } else if(!getDownLeft){

                direction = 1;

            }

            getDownRight = true;

        }  
    }
    
    for(let i = 0; i < invaders.length; i++){
        allDivs[invaders[i]].classList.remove("invader");
    }

    for(let i = 0; i < invaders.length; i++){
        invaders[i] += direction;
    }

    for(let i = 0; i < invaders.length; i++){
        allDivs[invaders[i]].classList.add("invader");
    }

    if(allDivs[defenderPosition].classList.contains("invader", "defenser")){
        $score.innerHTML = `Score : ${displayScore()} <br> <span id="game-over"><i class="far fa-grimace"></i> Aïe ! Game Over <i class="far fa-grimace"></i></span>`,
        clearInterval(invaderId)
    }

}

invaderId = setInterval(moveInvaders, 500);


const fire = (event) => {

    event.preventDefault();

    let laserId;
    let currentLaser = defenderPosition; 

    const moveFire = () => {

        allDivs[currentLaser].classList.remove("laser");
        currentLaser -= width;
        allDivs[currentLaser].classList.add("laser");

        if(allDivs[currentLaser].classList.contains("invader")){
            
            allDivs[currentLaser].classList.remove("laser");
            allDivs[currentLaser].classList.remove("invader");
            allDivs[currentLaser].classList.add("boom");

            destroyedInvaders === 36 ?(
                $score.innerHTML = `Score : ${displayScore()} <br> <span id="victory"><i class="fas fa-trophy"></i> Bravo ! Vous avez gagné <i class="fas fa-trophy"></i></span>`,
                clearInterval(invaderId)
            ):(
                $score.innerHTML = `Score : ${displayScore()}`
            );
            
            invaders = invaders.filter(invader => invader !== currentLaser);

            setTimeout(() => allDivs[currentLaser].classList.remove("boom"), 250);

            clearInterval(laserId);
        }

        if(currentLaser < width){
            
            clearInterval(laserId);
            setTimeout(() => allDivs[currentLaser].classList.remove("laser"), 100);

        }
    }
    
    if(event.code === "Space"){
        laserId = setInterval(() => moveFire(), 100);
    }

}

document.addEventListener("keyup", fire);
