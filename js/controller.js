import Peca from './Peca.js';
import Peao from './Peao.js';

var pecas = [];
var activePiece;

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
    let peca;
    switch(name){
        case "peao":
            peca = new Peao(name,cor, location, img);
            break;
        default:
            peca = new Peca(name,cor, location, img);
    }
    peca.img.src = `./images/${name}-${cor}.png`;
    peca.img.className = 'peca';
    peca.img.addEventListener("click",() => {activateClickableMovement(peca)});
    return peca;
}
/*
This function is not intended to clear pieces properties,
only style and html properties.
*/
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
        if(activePiece !== undefined) activePiece.desactivate();
        activePiece = peca;
        let location = peca.possibleLocation();
        location.forEach(l => {
            if(!checkColision(l)){
                document.querySelector('#'+l.destination).classList.add('available');
                document.querySelector('#'+l.destination).setAttribute('origem',peca.location);
                document.querySelector('#'+l.destination).addEventListener("click", move);
            }else{
                document.querySelector('#'+l.destination).classList.add('unavailable'); 
            }
        })
    }else{
        peca.desactivate();
        activePiece = undefined;
    }
}

/*
Check if the final destination is free
and if it's a piece that doesn't jump
other pieces, validade if the path to 
that destination is free.
*/
function checkColision(location){
    let pathOk = true;
    location.path.forEach(function(e){
        pathOk = pathOk && (pecas.findIndex(p => p.location == e) < 0); 
    })
    return (pecas.findIndex(e => e.location == location.destination) >= 0) || !pathOk;
}

function move(){
    let origem = this.getAttribute('origem');
    let destino = this.id;
    let peca = pecas[pecas.findIndex(e => e.location == origem)]
    peca.desactivate();
    activePiece = undefined;
    peca.move(destino);
    clearMovement();
}

