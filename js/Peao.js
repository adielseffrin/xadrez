import Peca from './Peca.js';

class Peao extends Peca{
    constructor(nome, cor, location, img){
        super(nome, cor, location, img);
    }

    possibleLocation(){
        let possibilities = [];
        let newRow, newCol, path = [];
        if(this.cor == "branco"){
            if(parseInt(this.row)-1 >= 97){
                newRow = String.fromCharCode(parseInt(this.row)-1);
                newCol = this.col;
                possibilities.push({destination:newRow+""+newCol,path:[]});  
            }
            if(this.firstMove && parseInt(this.row)-2 >= 97){
                newRow = String.fromCharCode(parseInt(this.row)-2);
                newCol = this.col;
                let destination = newRow+""+newCol;
                path.push(String.fromCharCode(parseInt(this.row)-1)+""+newCol);
                possibilities.push({destination:destination,path:path});
            }
        }else{
            if(parseInt(this.row)+1 <= 104){
                newRow = String.fromCharCode(parseInt(this.row)+1);
                newCol = this.col;
                possibilities.push({destination:newRow+""+newCol,path:[]});  
            }
            if(this.firstMove && parseInt(this.row)+2 <= 104){
                newRow = String.fromCharCode(parseInt(this.row)+2);
                newCol = this.col;
                let destination = newRow+""+newCol;
                path.push(String.fromCharCode(parseInt(this.row)+1)+""+newCol);
                possibilities.push({destination:destination,path:path});
            }
        }
        return possibilities;
    }
}

export default Peao;