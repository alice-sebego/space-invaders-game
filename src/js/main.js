const $container = document.querySelector(".grid");

let allDivs;
let invaders = [];
let defender = 229;

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
                block.setAttribute("data-left", "true");
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
        console.log(invaders);
        allDivs = document.querySelectorAll(".grid div");
        invaders.forEach( invader =>{
            allDivs[invader].classList.add("invader");
        });
        allDivs[defender].classList.add("defender");
        
}

createGridAndInvaders();