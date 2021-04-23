class Peca{
    constructor(nome, cor, location, img){
        this.nome = nome;
        this.cor = cor;
        this.location = location;
        this.img = img;
        this.updatePositionCoord();
        this.active = false;
        this.firstMove = true; //valido para peao, rei e torre
    }

    updatePositionCoord(){
        this.row = [...this.location][0].charCodeAt(0);
        this.col = [...this.location][1];
    }

    render(){
        document.getElementById(this.location).appendChild(this.img);
    }

    move(toLocation){
        document.getElementById(this.location).removeChild(this.img);
        this.location = toLocation;
        this.render();
        this.updatePositionCoord();
        if(this.firstMove) this.firstMove = false;
    }

    possibleLocation(){
        let possibilities = [];
        let newRow;
        switch(this.nome){
            case "peao":
                if(this.cor == "branco"){
                    newRow = String.fromCharCode(parseInt(this.row)-1 >= 97 ? parseInt(this.row)-1 :parseInt(this.row));
                    possibilities.push(newRow+""+this.col);
                    if(this.firstMove){
                        newRow = String.fromCharCode(parseInt(this.row)-2 >= 97 ? parseInt(this.row)-2 :parseInt(this.row));
                        possibilities.push(newRow+""+this.col);
                    }
                }else{
                    newRow = String.fromCharCode(parseInt(this.row)+1 <= 104 ? parseInt(this.row)+1 :parseInt(this.row));
                    possibilities.push(newRow+""+this.col);
                    if(this.firstMove){
                        newRow = String.fromCharCode(parseInt(this.row)+2 <= 104 ? parseInt(this.row)+2 :parseInt(this.row));
                        possibilities.push(newRow+""+this.col);
                    }
                }
            break;
        }
        return possibilities;
    }

    activate(){
        this.active = true; 
        document.querySelector('#'+this.location).classList.add('active');
        
    }

    desactivate(){
        this.active = false; 
        document.querySelector('#'+this.location).classList.remove('active');
    }
}

var pecas = [];

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        placeStartingPieces();
      pecas.forEach(p => p.render());
    }
  };
  
function placeStartingPieces(){
    pecas.push(createPiece("a1","torre","preto"));
    pecas.push(createPiece("a2","cavalo","preto"));
    pecas.push(createPiece("a3","bispo","preto"));
    pecas.push(createPiece("a4","rei","preto"));
    pecas.push(createPiece("a5","rainha","preto"));
    pecas.push(createPiece("a6","bispo","preto"));
    pecas.push(createPiece("a7","cavalo","preto"));
    pecas.push(createPiece("a8","torre","preto"));
    pecas.push(createPiece("b1","peao","preto"));
    pecas.push(createPiece("b2","peao","preto"));
    pecas.push(createPiece("b3","peao","preto"));
    pecas.push(createPiece("b4","peao","preto"));
    pecas.push(createPiece("b5","peao","preto"));
    pecas.push(createPiece("b6","peao","preto"));
    pecas.push(createPiece("b7","peao","preto"));
    pecas.push(createPiece("b8","peao","preto"));

    pecas.push(createPiece("h1","torre","branco"));
    pecas.push(createPiece("h2","cavalo","branco"));
    pecas.push(createPiece("h3","bispo","branco"));
    pecas.push(createPiece("h4","rei","branco"));
    pecas.push(createPiece("h5","rainha","branco"));
    pecas.push(createPiece("h6","bispo","branco"));
    pecas.push(createPiece("h7","cavalo","branco"));
    pecas.push(createPiece("h8","torre","branco"));
    pecas.push(createPiece("g1","peao","branco"));
    pecas.push(createPiece("g2","peao","branco"));
    pecas.push(createPiece("g3","peao","branco"));
    pecas.push(createPiece("g4","peao","branco"));
    pecas.push(createPiece("g5","peao","branco"));
    pecas.push(createPiece("g6","peao","branco"));
    pecas.push(createPiece("g7","peao","branco"));
    pecas.push(createPiece("g8","peao","branco"));

    pecas.push(createPiece("e5","peao","preto"));

}

function createPiece(location, name, cor){
    let img = document.createElement('img');
    let peca = new Peca(name,cor, location, img);
    peca.img.src = `./images/${name}-${cor}.png`;
    peca.img.className = 'peca';
    peca.img.addEventListener("click",() => {activateClickableMovement(peca)});
    return peca;
}

function clearMovement(){
    let elAct = document.querySelectorAll(['.available ','.unavailable']);
    elAct.forEach(function(e){
        e.classList.remove('available'); 
        e.classList.remove('unavailable');
        e.removeEventListener("click", move);
        e.removeAttribute('origem');
    });
}

function activateClickableMovement(peca){
    clearMovement();
    if(!peca.active){
        peca.activate();
        let location = peca.possibleLocation();
        location.forEach(l => {
            if(!checkColision(l)){
                document.querySelector('#'+l).classList.add('available');
                document.querySelector('#'+l).setAttribute('origem',peca.location);
                document.querySelector('#'+l).addEventListener("click", move);
            }else{
                document.querySelector('#'+l).classList.add('unavailable'); 
            }
        })
    }else{
        peca.desactivate();
    }
}

function checkColision(location){
   return pecas.findIndex(e => e.location == location) >= 0;
}

function move(){
    let origem = this.getAttribute('origem');
    let destino = this.id;
    let peca = pecas[pecas.findIndex(e => e.location == origem)]
    peca.desactivate();
    peca.move(destino);
    clearMovement();
}

