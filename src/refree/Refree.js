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
    isValidMove(px,py,x,y,type,team,boardState){
        console.log(type, px, py, x, y,team);
        if(type === "PAWN"){
            const specialRow = (team === "w") ? 1: 6;
            const pawnDirection = (team === "w")? 1: -1;

            if(px === x && py === specialRow && y-py === 2*pawnDirection){
                if(!this.tileIsOccupied(x,y,boardState) && !this.tileIsOccupied(x,y-pawnDirection,boardState))
                    return true;
            }
            else if(px === x && y-py === pawnDirection){
                if(!this.tileIsOccupied(x,y,boardState))
                    return true;
            }
            else {
                return false;
            }
        }
    }
}