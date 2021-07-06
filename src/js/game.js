/**
 * Build a game's session
 * @class Game
 */
export default class Game {

    allDivs;
    invaders = [];
    defenderPosition = 229;
    direction = 1;
    width = 20;
    destroyedInvaders = 1;
    indexAttr = 0;
    getDownLeft = true;
    getDownRight = true;

    /**
     * @constructor
     * @param {HTMLDivElement} container [space of game with area : 500px²]
     * @param {HTMLHeadingElement} score [Display user's score]
     * @param {Function} invaderId [Empty variable that's store a setInterval()] 
     * @param {number} speed [speed of remove of invaders] 
     */
    constructor(container, score, invaderId, speed){
        this.container = container;
        this.score = score;
        this.invaderId = invaderId;
        this.speed = speed;
    }

    /**
     * Increment score of user when (s)he's shot an invader
     * @function displayScore
     * @returns {number} 
     */
    displayScore = () => {
        return this.destroyedInvaders < 10 ?  
        `0${this.destroyedInvaders ++}`:
        this.destroyedInvaders ++;
    }

    /**
     * Create grid on container which contains invaders and a defender
     * @function buildGridAndInvadersAndDefender
     */
    buildGridAndInvadersAndDefender = () => {

        for(let i = 0; i < 240; i++){
            
            if(this.indexAttr === 0){
                
                const block = document.createElement("div");
                block.setAttribute("data-left", "true");
                this.container.appendChild(block);
                this.indexAttr ++;

            } else if(this.indexAttr === 19){

                const block = document.createElement("div");
                block.setAttribute("data-right", "true");
                this.container.appendChild(block);
                this.indexAttr = 0;

            } else {

                const block = document.createElement("div");
                this.container.appendChild(block);
                this.indexAttr ++;

            }

        }

        for(let i = 1; i < 53; i++){
            
            switch (i) {
                case 13:
                    i = 21;
                    this.invaders.push(i);
                    break;
                case 33:
                    i = 41;
                    this.invaders.push(i);
                    break;
                default:
                    this.invaders.push(i);
                    break;
            }

        }
        
        this.allDivs = document.querySelectorAll(".grid div");
        
        this.invaders.forEach( invader => this.allDivs[invader].classList.add("invader") );

        this.allDivs[this.defenderPosition].classList.add("defender");
    
    }

    /**
     * Allow user's to move defender on the container
     * @function movedefender
     * @param {Event} event 
     */
    movedefender = (event) => {

        event.preventDefault();

        this.allDivs[this.defenderPosition].classList.remove("defender");
    
        switch (event.code) {
            case "ArrowLeft":
                if(this.defenderPosition > 220) this.defenderPosition -= 1;
                break;
            case "ArrowRight":
                if(this.defenderPosition < 239) this.defenderPosition += 1;
                break;
        }
    
        this.allDivs[this.defenderPosition].classList.add("defender");
      
    }

    /**
     * Handle user's actions with keyboard
     * @function handleEvent
     * @param {Event} event 
     */
    handleEvent = (event) => {
        
        switch(event.type) {
            case "keydown":
                this.movedefender(event);
            break;
            case "keyup":
                this.fire(event);
            break;
        }

    }

    /**
     * Allow invaders to move on the container
     * @function moveInvaders
     */
    moveInvaders = () => {

        for(let i = 0; i < this.invaders.length; i++){
          
            if(this.allDivs[this.invaders[i]].getAttribute("data-right") === "true"){
              
                if(this.getDownRight){
    
                  this.direction = 20;
                  setTimeout(() => this.getDownRight = false, 50);
    
                } else if(!this.getDownRight){
    
                  this.direction = -1;
                }
    
                this.getDownLeft= true;
    
            } else if(this.allDivs[this.invaders[i]].getAttribute("data-left") === "true"){
    
                if(this.getDownLeft){
    
                    this.direction = 20;
                    setTimeout(() => this.getDownLeft = false, 50);
    
                } else if(!this.getDownLeft){
    
                    this.direction = 1;
    
                }
    
                this.getDownRight = true;
    
            }  
        }
        
        for(let i = 0; i < this.invaders.length; i++){
            this.allDivs[this.invaders[i]].classList.remove("invader");
        }
    
        for(let i = 0; i < this.invaders.length; i++){
            this.invaders[i] += this.direction;
        }
    
        for(let i = 0; i < this.invaders.length; i++){
            this.allDivs[this.invaders[i]].classList.add("invader");
        }
    
        if(this.allDivs[this.defenderPosition].classList.contains("invader", "defender")){
            this.allDivs[this.defenderPosition].classList.add("boom");
            this.score.innerHTML = `Score : ${36 - this.invaders.length} <br> <span id="game-over"><i class="far fa-grimace"></i> Aïe ! Game Over <i class="far fa-grimace"></i></span>`,
            clearInterval(this.invaderId);
            this.resetGame();
        }
    
        for(let i = 0; i < this.invaders.length; i++){
            if(this.invaders[i] > this.allDivs.length - this.width){
                this.allDivs[this.defenderPosition].classList.add("boom");
                this.score.innerHTML = `Score : ${36 - this.invaders.length} <br> <span id="game-over"><i class="far fa-grimace"></i> Aïe ! Game Over <i class="far fa-grimace"></i></span>`,
                clearInterval(this.invaderId);
                this.resetGame(); 
            }
        }
    
    }

    /**
     * Handle move of invaders and their speed move
     * @function intervalInvaderId
     * @returns {Function} this.invaderId that's storing a setInterval()
     */
    intervalInvaderId = () => {

        this.invaderId = setInterval(this.moveInvaders, this.speed);
        return this.invaderId;

    }

    /**
     * Handle user's shoots 
     * @function fire
     * @param {Event} event 
     */
    fire = (event) => {

        event.preventDefault();
    
        let laserId;
        let currentLaser = this.defenderPosition; 
    
        const moveFire = () => {
    
            this.allDivs[currentLaser].classList.remove("laser");
            currentLaser -= this.width;
            this.allDivs[currentLaser].classList.add("laser");
    
            if(this.allDivs[currentLaser].classList.contains("invader")){
                
                this.allDivs[currentLaser].classList.remove("laser");
                this.allDivs[currentLaser].classList.remove("invader");
                this.allDivs[currentLaser].classList.add("boom");
    
                this.destroyedInvaders === 36 ?(
                    this.score.innerHTML = `Score : ${this.displayScore()} <br> <span id="victory"><i class="fas fa-trophy"></i> Bravo ! Vous avez gagné <i class="fas fa-trophy"></i></span>`,
                    clearInterval(this.invaderId),
                    this.resetGame()
                ):(
                    this.score.innerHTML = `Score : ${this.displayScore()}`
                );
                
                this.invaders = this.invaders.filter(invader => invader !== currentLaser);
    
                setTimeout(() => this.allDivs[currentLaser].classList.remove("boom"), 250);
    
                clearInterval(laserId);
            }
    
            if(currentLaser < this.width){
                
                clearInterval(laserId);
                setTimeout(() => this.allDivs[currentLaser].classList.remove("laser"), 100);
    
            }
        }
        
        if(event.code === "Space"){
            laserId = setInterval(() => moveFire(), 100);
        }
    
    }

    resetGame = () => {
        setTimeout(() => this.container.innerHTML = "" , 4000);
        setTimeout(() => this.score.innerHTML = "Score : -- ", 5000);
    }

}