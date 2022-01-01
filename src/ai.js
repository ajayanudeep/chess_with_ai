import Chessboard from "./components/Chessboard";
const pawn_table=[
    [ 0,  0,  0,  0,  0,  0,  0,  0],
    [ 5, 10, 10,-20,-20, 10, 10,  5],
    [ 5, -5,-10,  0,  0,-10, -5,  5],
    [ 0,  0,  0, 20, 20,  0,  0,  0],
    [ 5,  5, 10, 25, 25, 10,  5,  5],
    [10, 10, 20, 30, 30, 20, 10, 10],
    [50, 50, 50, 50, 50, 50, 50, 50],
    [ 0,  0,  0,  0,  0,  0,  0,  0]
];
const knight_table=[
    [-50, -40, -30, -30, -30, -30, -40, -50],
    [-40, -20,   0,   5,   5,   0, -20, -40],
    [-30,   5,  10,  15,  15,  10,   5, -30],
    [-30,   0,  15,  20,  20,  15,   0, -30],
    [-30,   5,  15,  20,  20,  15,   0, -30],
    [-30,   0,  10,  15,  15,  10,   0, -30],
    [-40, -20,   0,   0,   0,   0, -20, -40],
    [-50, -40, -30, -30, -30, -30, -40, -50]
];
const bishop_table=[
    [-20, -10, -10, -10, -10, -10, -10, -20],
    [-10,   5,   0,   0,   0,   0,   5, -10],
    [-10,  10,  10,  10,  10,  10,  10, -10],
    [-10,   0,  10,  10,  10,  10,   0, -10],
    [-10,   5,   5,  10,  10,   5,   5, -10],
    [-10,   0,   5,  10,  10,   5,   0, -10],
    [-10,   0,   0,   0,   0,   0,   0, -10],
    [-20, -10, -10, -10, -10, -10, -10, -20]
];
const rook_table=[
    [ 0,  0,  0,  5,  5,  0,  0,  0],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [ 5, 10, 10, 10, 10, 10, 10,  5],
    [ 0,  0,  0,  0,  0,  0,  0,  0]
]
const queen_table =[
    [-20, -10, -10, -5, -5, -10, -10, -20],
    [-10,   0,   5,  0,  0,   0,   0, -10],
    [-10,   5,   5,  5,  5,   5,   0, -10],
    [  0,   0,   5,  5,  5,   5,   0,  -5],
    [ -5,   0,   5,  5,  5,   5,   0,  -5],
    [-10,   0,   5,  5,  5,   5,   0, -10],
    [-10,   0,   0,  0,  0,   0,   0, -10],
    [-20, -10, -10, -5, -5, -10, -10, -20]
];
function get_piece(x,y) {
    if (!in_bounds(x,y)){
        return 0;
    }
    const piece = Chessboard.pieces.foreach((p) => p.x === x && p.y === y);
    return piece;
}
// to check if the piece is in bounds of the chess
function in_bounds(x,y) {
    return (x>=0 && y>=0 && x<8 && y<8)
}
function get_move(xto,yto,piece) {
    var move=0;
    if(in_bounds(xto,yto)){
        var coin=get_piece(xto,yto,piece)
        if(coin!=0){
            if(coin.team!==piece.team){
                move={xfrom:piece.x,yfrom:piece.y,xto:xto,yto:yto,castling_move:false};
            }
        }
        else{
            move={xfrom:piece.x,yfrom:piece.y,xto:xto,yto:yto,castling_move:false};
        }
    }
    return move;
}
function get_possible_horizontal_moves(piece){
    var moves=[];
    // horizontal right movement
    for (let i = 1; i < 8-piece.x; i++) {
        var coin = get_piece(piece.x+i,piece.y);
        moves.push(get_move(piece.x+i,piece.y,piece));
        if(coin)
            break;
    }
    // horizontal left movement
    for (let i = 1; i < piece.x+1; i++) {
        var coin = get_piece(piece.x-i,piece.y);
        moves.push(get_move(piece.x-i,piece.y,piece));
        if(coin)
            break;
    }
    //vertical downwards
    for (let i = 1; i < 8 - piece.y; i++) {
        var coin = get_piece(piece.x,piece.y+i);
        moves.push(get_move(piece.x,piece.y+i,piece));
        if(coin)
            break;
    }
    // vertical upwards
    for (let i = 1; i < piece.y+1; i++) {
        var coin = get_piece(piece.x,piece.y-i);
        moves.push(get_move(piece.x,piece.y-i,piece));
        if(coin)
            break;
    }
    return remove_null_from_list(moves)
}
function get_possible_diagonal_moves(piece) {
    var moves=[];
    for (let i = 1; i < 8; i++) {
        if(!in_bounds(piece.x+i,piece.y+i)){
            break;
        }
        var coin=get_piece(piece.x+i,piece.y+i);
        moves.push(get_move(piece.x+i,piece.y+i));
        if(coin)
            break
    }
    for (let i = 1; i < 8; i++) {
        if(!in_bounds(piece.x+i,piece.y-i)){
            break;
        }
        var coin=get_piece(piece.x+i,piece.y-i);
        moves.push(get_move(piece.x+i,piece.y-i));
        if(coin)
            break
    }
    for (let i = 1; i < 8; i++) {
        if(!in_bounds(piece.x-i,piece.y-i)){
            break;
        }
        var coin=get_piece(piece.x-i,piece.y-i);
        moves.push(get_move(piece.x-i,piece.y-i));
        if(coin)
            break
    }
    for (let i = 1; i < 8; i++) {
        if(!in_bounds(piece.x-i,piece.y+i)){
            break;
        }
        var coin=get_piece(piece.x-i,piece.y+i);
        moves.push(get_move(piece.x-i,piece.y+i));
        if(coin)
            break
    }
    return remove_null_from_list(moves);
}
function remove_null_from_list(l){
    const moves=[];
    for (const key in l) {
        if (key!=0) {
            moves.push(key);
        }
    }
    return moves
}
class PAWN{
    is_starting_position(piece){
        if(piece.team==="b"){
            return piece.y==6;
        }
        else{
            return piece.y==1;
        }
    }
    get_possible_moves(piece) {
        var moves=[];
        var direction=-1;
        if(piece.team=="w"){
            direction=1;
        }
        // one step forward
        if(get_piece(piece.x,piece.y+direction)==0){
            moves.push(get_move(piece.x,piece.y+direction,piece));
        }
        // two step forward
        if(this.is_starting_position(piece) && get_piece(piece.x,piece.y+direction,piece) == 0 && get_piece(piece.x,piece.y+direction*2,piece) == 0){
            moves.push(get_move(piece.x,piece.y+direction*2,piece));
        }
        var coin=get_piece(piece.x + 1,piece.y + direction);
        if(coin!=0){
            moves.push(get_move(piece.x + 1,piece.y + direction,piece));
        }
        coin=get_piece(piece.x - 1,piece.y + direction);
        if(coin!=0){
            moves.push(get_move(piece.x - 1,piece.y + direction,piece));
        }
        return remove_null_from_list(moves)
    }
}
class ROOK{
    get_possible_moves(piece){
        return get_possible_horizontal_moves(piece)
    }
}
class BISHOP{
    get_possible_moves(piece){
        return get_possible_diagonal_moves(piece);
    }
}
class QUEEN{
    get_possible_moves(piece){
        var horizontal=get_possible_horizontal_moves(piece);
        var diagonal=get_possible_diagonal_moves(piece);
        return horizontal.concat(diagonal);
    }
}
class KNIGHT{
    get_possible_moves(piece){
        var moves=[];
        moves.push(get_move(piece.x+2,piece.y+1,piece));
        moves.push(get_move(piece.x-1,piece.y+2,piece));
        moves.push(get_move(piece.x-2,piece.y+1,piece));
        moves.push(get_move(piece.x+1,piece.y-2,piece));
        moves.push(get_move(piece.x+2,piece.y-1,piece));
        moves.push(get_move(piece.x+1,piece.y+2,piece));
        moves.push(get_move(piece.x-2,piece.y-1,piece));
        moves.push(get_move(piece.x-1,piece.y-2,piece));

        return remove_null_from_list(moves);
    }
}
class KING{
    get_possible_moves(piece){
        var moves=[];

        moves.push(get_move(piece.x+1,piece.y,piece));
        moves.push(get_move(piece.x+1,piece.y+1,piece));
        moves.push(get_move(piece.x,piece.y+1,piece));
        moves.push(get_move(piece.x-1,piece.y+1,piece));
        moves.push(get_move(piece.x-1,piece.y,piece));
        moves.push(get_move(piece.x-1,piece.y-1,piece));
        moves.push(get_move(piece.x,piece.y-1,piece));
        moves.push(get_move(piece.x+1,piece.y-1,piece));

        return remove_null_from_list(moves);
    }
}
function get_possible_moves(color){
    var moves=[]
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = Chessboard.pieces.foreach((p) => p.x === i && p.y === j);
            if(piece){
                if (piece.team===color) {
                    moves.concat(`${piece.type}`.get_possible_moves(piece));
                }
            }
        }
    }
    return moves;
};
const infinity=100000000;
class AI{
    get_ai_move(pieces){
        var best_move=0;
        var best_score=infinity;

    }
    alphabeta(){
        
        
    }
}

export default AI
