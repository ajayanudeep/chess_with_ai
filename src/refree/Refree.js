export default class Refree {
    isValidMove(px,py,x,y,type,team){
        console.log(type, px, py, x, y,team);
        if(type === "PAWN"){
            if(team === 'w'){
                if(py === 1  && Math.abs(px-x) === 0 && y-py<=2 && y-py >0){
                    return true;
                }
                else if(Math.abs(px-x) === 0 && y-py<2 && y-py >0){
                    return true;
                }
                // else if(Math.abs(px-x) === 1 && Math.abs(py-y) === 1 ){
                //     return true;
                // }
                else{
                    return false;
                }
            }
            if(team === 'b'){
                if(py === 6  && Math.abs(px-x) === 0 && py-y<=2 && py-y>0){
                    return true;
                }
                else if(Math.abs(px-x) === 0 && py-y<2 && py-y>0){
                    return true;
                }
                // else if(Math.abs(px-x) === 1 && Math.abs(py-y) === 1 ){
                //     return true;
                // }
                else{
                    return false;
                }
            }
        }
    }
}