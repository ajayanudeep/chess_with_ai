export default class Refree {
    tileIsOccupied(x, y, boardState){
        const piece = boardState.find((p) => p.x === x && p.y === y)
        if(piece){
            return true;
        }
        else{
            return false;
        }
    };
    tileIsOccupiedByOpponent(x, y, boardState,team){
        const piece = boardState.find((p) => p.x === x && p.y === y)
        if(piece){
            if(piece.team === team){
                return false;
            }
            else{
                return true;
            }
        }
        else{
            return false;
        }
    };
    isEnPassentMove(px, py, x, y, boardState, type, team){
        const pawnDirection = team === "w" ? 1 : -1;
        if(type === "PAWN"){
            if((x-px === 1 || x-px === -1) && y-py === pawnDirection){
                const piece = boardState.find(p => p.x === x && p.y === y - pawnDirection && p.enPassant)
                if(piece)
                    return true;
            }

        }
        return false;
    }
    isValidMove(px,py,x,y,type,team,boardState){
        console.log(type,px, py, x, y,team);
        //Pawn
        if(type === "PAWN"){
            const specialRow = (team === "w") ? 1: 6;
            const pawnDirection = (team === "w")? 1: -1;
            //Pawn Movement
            if(px === x && py === specialRow && y-py === 2*pawnDirection){
                if(!this.tileIsOccupied(x,y,boardState) && !this.tileIsOccupied(x,y-pawnDirection,boardState))
                    return true;
            }
            else if(px === x && y-py === pawnDirection){
                if(!this.tileIsOccupied(x,y,boardState))
                    return true;
            }
            //Attacking
            else if(x-px === 1 && y-py === pawnDirection){
                //Upper / Bottom Right corner
                if(this.tileIsOccupied(x,y,boardState))
                if(this.tileIsOccupiedByOpponent(x,y,boardState,team)){
                    return true;
                }
            }
            else if(x-px === -1 && y-py === pawnDirection){
                //Upper / Bottom Left corner
                if(this.tileIsOccupied(x,y,boardState))
                if(this.tileIsOccupiedByOpponent(x,y,boardState,team)){
                    return true;
                }
            }
            else {
                return false;
            }
        }
        //Knight
        else if(type === "KNIGHT"){
            if((y === py+2 || y === py-2) && (x === px+1 || x === px-1)){
                if(this.tileIsOccupied(x,y,boardState)){
                    if((this.tileIsOccupiedByOpponent(x,y,boardState,team))){
                        return true;
                    }
                    return false;
                }   
                return true;
            }
            else if((x === px+2 || x === px -2) && (y === py+1 || y === py-1)){
                if(this.tileIsOccupied(x,y,boardState)){
                    if((this.tileIsOccupiedByOpponent(x,y,boardState,team))){
                        return true;
                    }
                    return false;
                }
                return true;
            }
        }
        //Bishop
        else if(type === "BISHOP"){
            let valid = true;
            if( px === x || py === y){
                valid = false;
            }
            if(x > px && (Math.abs(x-px) === Math.abs(y-py))){
                if(y > py){
                    for (let i = 1; i < x-px; i++) {
                        if(this.tileIsOccupied(px+i,py+i,boardState)){
                            valid = false;
                        }
                    }
                    if (!this.tileIsOccupied(x,y,boardState) && valid ){
                        valid =true;
                    }
                    else if(this.tileIsOccupiedByOpponent(x,y,boardState,team) && valid === true){
                        valid = true;
                    }
                    else{
                        valid = false;
                    }
                }
                else if(y < py){
                    for (let i = 1; i < x-px; i++) {
                        if(this.tileIsOccupied(px+i,py-i,boardState)){
                            valid = false;
                        }
                    }
                    if (!this.tileIsOccupied(x,y,boardState) && valid ){
                        valid =true;
                    }
                    else if(this.tileIsOccupiedByOpponent(x,y,boardState,team) && valid === true){
                        valid = true;
                    }
                    else{
                        valid = false;
                    }
                }
            }
            else if (x <px && (Math.abs(x-px) === Math.abs(y-py))){
                if(y > py){
                    for (let i = 1; i < px -x; i++) {
                        if(this.tileIsOccupied(px-i,py+i,boardState)){
                            valid = false;      
                        }
                    }
                    if (!this.tileIsOccupied(x,y,boardState) && valid ){
                        valid =true;
                    }
                    else if(this.tileIsOccupiedByOpponent(x,y,boardState,team) && valid === true){
                        valid = true;
                    }
                    else{
                        valid = false;
                    }
                }
                else if(y < py && (Math.abs(x-px) === Math.abs(y-py))){
                    for (let i = 1; i <px-x; i++) {
                        if(this.tileIsOccupied(px-i,py-i,boardState)){
                            valid = false;
                        }
                    }
                    if (!this.tileIsOccupied(x,y,boardState) && valid ){
                        valid =true;
                    }
                    else if(this.tileIsOccupiedByOpponent(x,y,boardState,team) && valid === true){
                        valid = true;
                    }
                    else{
                        valid = false;
                    }
                }  
            }
            else{
                valid = false;
            }
            return valid;
        }
        //Rook
        else if(type === "ROOK"){
            let valid = true;
            if ( px === x ){
                for(let i = 1; i < Math.abs(y-py); i++){
                    if(this.tileIsOccupied(px , (py+ (i*((y-py)/Math.abs(y-py)))),boardState)){
                        
                        valid = false;
                    }
                }
                if (!this.tileIsOccupied(x,y,boardState) && valid ){
                    
                    valid =true;
                }
                else if(this.tileIsOccupiedByOpponent(x,y,boardState,team) && valid === true){
                    
                    valid = true;
                }
                else{
                    valid = false;
                }    
            }
            else if( py === y){
                for(let i = 1; i < Math.abs(x-px); i++){
                    if(this.tileIsOccupied(px + (i* ((x-px)/Math.abs(x-px))) , py,boardState)){
                        valid = false;
                    }
                }
                if (!this.tileIsOccupied(x,y,boardState) && valid ){
                    valid =true;
                }
                else if(this.tileIsOccupiedByOpponent(x,y,boardState,team) && valid === true){
                    valid = true;
                }
                else{
                    valid = false;
                }
            }
            else{
                valid =false;
            }
            return valid;
        }
        // Queen
        else if(type === "QUEEN"){
            let valid = true;
            if ( px === x ){
                for(let i = 1; i < Math.abs(y-py); i++){
                    if(this.tileIsOccupied(px , (py+ (i*((y-py)/Math.abs(y-py)))),boardState)){
                        
                        valid = false;
                    }
                }
                if (!this.tileIsOccupied(x,y,boardState) && valid ){
                    
                    valid =true;
                }
                else if(this.tileIsOccupiedByOpponent(x,y,boardState,team) && valid === true){
                    
                    valid = true;
                }
                else{
                    valid = false;
                }    
            }
            else if( py === y){
                for(let i = 1; i < Math.abs(x-px); i++){
                    if(this.tileIsOccupied(px + (i* ((x-px)/Math.abs(x-px))) , py,boardState)){
                        valid = false;
                    }
                }
                if (!this.tileIsOccupied(x,y,boardState) && valid ){
                    valid =true;
                }
                else if(this.tileIsOccupiedByOpponent(x,y,boardState,team) && valid === true){
                    valid = true;
                }
                else{
                    valid = false;
                }
            }
            else if(x > px && (Math.abs(x-px) === Math.abs(y-py))){
                if(y > py){
                    for (let i = 1; i < x-px; i++) {
                        if(this.tileIsOccupied(px+i,py+i,boardState)){
                            valid = false;
                        }
                    }
                    if (!this.tileIsOccupied(x,y,boardState) && valid ){
                        valid =true;
                    }
                    else if(this.tileIsOccupiedByOpponent(x,y,boardState,team) && valid === true){
                        valid = true;
                    }
                    else{
                        valid = false;
                    }
                }
                else if(y < py){
                    for (let i = 1; i < x-px; i++) {
                        if(this.tileIsOccupied(px+i,py-i,boardState)){
                            valid = false;
                        }
                    }
                    if (!this.tileIsOccupied(x,y,boardState) && valid ){
                        valid =true;
                    }
                    else if(this.tileIsOccupiedByOpponent(x,y,boardState,team) && valid === true){
                        valid = true;
                    }
                    else{
                        valid = false;
                    }
                }
            }
            else if (x < px && (Math.abs(x-px) === Math.abs(y-py))){
                if(y > py){
                    for (let i = 1; i < px -x; i++) {
                        if(this.tileIsOccupied(px-i,py+i,boardState)){
                            valid = false;      
                        }
                    }
                    if (!this.tileIsOccupied(x,y,boardState) && valid ){
                        valid =true;
                    }
                    else if(this.tileIsOccupiedByOpponent(x,y,boardState,team) && valid === true){
                        valid = true;
                    }
                    else{
                        valid = false;
                    }
                }
                else if(y < py){
                    for (let i = 1; i <px-x; i++) {
                        if(this.tileIsOccupied(px-i,py-i,boardState)){
                            valid = false;
                        }
                    }
                    if (!this.tileIsOccupied(x,y,boardState) && valid ){
                        valid =true;
                    }
                    else if(this.tileIsOccupiedByOpponent(x,y,boardState,team) && valid === true){
                        valid = true;
                    }
                    else{
                        valid = false;
                    }
                }
            }
            else{
                valid = false;
            }
            return valid;
        }
        //King
        else if(type === "KING"){
            if(px === x ){
                if(py === y+1 || py === y-1){
                    if(!this.tileIsOccupied(x,y,boardState)){
                        return true;
                    }
                    else if(!this.tileIsOccupiedByOpponent(x,y,boardState,team)){
                        return false;
                    }
                    else{
                        return true;
                    }
                }
            }
            else if(py === y ){
                if(px === x+1 || px === x-1){
                    if(!this.tileIsOccupied(x,y,boardState)){
                        return true;
                    }
                    else if(!this.tileIsOccupiedByOpponent(x,y,boardState,team)){
                        return false;
                    }
                    else{
                        return true;
                    }
                }
            }
            else if((py === y+1 && px === x+1)  || (py === y-1 && px === x-1) || (py === y+1 && px === x-1) || (py === y-1 && px === x+1)){
                if(!this.tileIsOccupied(x,y,boardState)){
                    return true;
                }
                else if(!this.tileIsOccupiedByOpponent(x,y,boardState,team)){
                    return false;
                }
                else{
                    return true;
                }
            }
        }
        return false;
    }
}