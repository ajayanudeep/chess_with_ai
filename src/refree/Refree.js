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
        if(piece.team === team){
            return false;
        }
        else{
            return true;
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
        console.log(type, px, py, x, y,team);
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
        return false;
    }
}