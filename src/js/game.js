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

    constructor(container, score, invaderId){
        this.container = container;
        this.score = score;
        this.invaderId = invaderId;
    }

    get allDivs(){
        return this.allDivs;
    }

    get defenderPosition(){
        return this.defenderPosition;
    }

    get width(){
        return this.width;
    }

    get destroyedInvaders(){
        return this.destroyedInvaders;
    }

    get invaders(){
        return this.invaders;
    }

    displayScore = () => {
        return this.destroyedInvaders < 10 ?  
        `0${this.destroyedInvaders ++}`:
        this.destroyedInvaders ++;
    }

    createGridAndInvaders = () => {

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
            default:
                console.log("Autre opération");
                break;
        }
    
        this.allDivs[this.defenderPosition].classList.add("defender");
      
    }

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
            this.score.innerHTML = `Score : ${36 - this.invaders.length} <br> <span id="game-over"><i class="far fa-grimace"></i> Aïe ! Game Over <i class="far fa-grimace"></i></span>`,
            clearInterval(this.invaderId);
        }
    
        for(let i = 0; i < this.invaders.length; i++){
            if(this.invaders[i] > this.allDivs.length - this.width){
                this.score.innerHTML = `Score : ${36 - this.invaders.length} <br> <span id="game-over"><i class="far fa-grimace"></i> Aïe ! Game Over <i class="far fa-grimace"></i></span>`,
                clearInterval(this.invaderId); 
            }
        }
    
    }

    intervalInvaderId(){
         this.invaderId = setInterval(this.moveInvaders, 500);
         return this.invaderId;
    }

}