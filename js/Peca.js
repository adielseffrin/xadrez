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

export default Peca;