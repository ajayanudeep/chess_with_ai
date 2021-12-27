import React from 'react'
import Tile from './Tile';
import { useRef, useState } from 'react';

const verticalAxis=["1","2","3","4","5","6","7","8"];
const horizantalAxis=["a","b","c","d","e","f","g","h"];
const initialBoardState = [];

function Chessboard() {
    const chessboardRef= useRef(null);
    const [activePiece, setActivePiece] = useState(null);
    const [pieces, setPieces] = useState(initialBoardState)
    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);

    const grabPiece = (e) =>{
        const chess_board = chessboardRef.current;
        const element=e.target;

        if(element.classList.contains("coin") &&  chess_board){            
            console.log(e.target)
            const x=e.clientX -45;
            const y=e.clientY -45;
            element.style.position ="absolute";
            element.style.left=`${x}px`;
            element.style.top=`${y}px`;
            setActivePiece(element);
            setGridX(Math.floor((e.clientX - chess_board.offsetLeft +40)/100));
            setGridY(Math.abs((Math.floor((e.clientY - chess_board.offsetTop +40)/100))-7));
        }   
    }

        
    const movePiece = (e) =>{
        const chess_board = chessboardRef.current;
        if(activePiece && chess_board){
            const minX = chess_board.offsetLeft -25;        //Left most position of board
            const minY = chess_board.offsetTop  -25;        //Top most position of board
            const maxX = chess_board.offsetLeft + chess_board.clientWidth-70;       //Right most position of board
            const maxY = chess_board.offsetTop+chess_board.clientHeight-70;         //Bottom most position of board
            const x= e.clientX -45;
            const y=e.clientY -45;
            activePiece.style.position ="absolute";

            if( x < minX) activePiece.style.left=`${minX}px`;
            else if(x > maxX) activePiece.style.left=`${maxX}px`;
            else activePiece.style.left=`${x}px`

            if(y < minY) activePiece.style.top=`${minY}px`;
            else if(y > maxY) activePiece.style.top=`${maxY}px`;
            else activePiece.style.top=`${y}px`;
        }  
    }

    const dropPiece =(e) =>{
        const chess_board = chessboardRef.current;
        if(activePiece && chess_board){
            const x = Math.floor((e.clientX - chess_board.offsetLeft +40)/100);
            const y = Math.abs((Math.floor((e.clientY - chess_board.offsetTop +40)/100))-7);
            
            setPieces((value) =>{
                const pieces =value.map(p =>{
                    if(p.x === gridX && p.y === gridY ){
                        p.x = x;
                        p.y = y;
                    }
                    return p;
                })
                return pieces;
            })

            setActivePiece(null);
        }
    }

    let board=[];

    for (let index = 0; index < horizantalAxis.length; index++) {
        initialBoardState.push({image:'icons/pawn_w.png', x:index ,y:1} )
    }
    for (let index = 0; index < horizantalAxis.length; index++) {
        initialBoardState.push({image:'icons/pawn_b.png', x:index ,y:6 } )
    }

    for(let p=0;p<2;p++){
        const type = (p===0)?"w":"b";
        const y = (p===0) ? 0:7;
        initialBoardState.push({image:`icons/rook_${type}.png`, x:0 , y:y })
        initialBoardState.push({image:`icons/rook_${type}.png`, x:7 , y:y })
        initialBoardState.push({image:`icons/bishop_${type}.png`, x:5 , y:y })
        initialBoardState.push({image:`icons/bishop_${type}.png`, x:2 , y:y })
        initialBoardState.push({image:`icons/knight_${type}.png`, x:1 , y:y })
        initialBoardState.push({image:`icons/knight_${type}.png`, x:6 , y:y })
        initialBoardState.push({image:`icons/king_${type}.png`, x:4 , y:y })
        initialBoardState.push({image:`icons/queen_${type}.png`, x:3 , y:y })
    }  
    

    for(let j=verticalAxis.length-1;j>=0;j--){
        for(let i=0;i<horizantalAxis.length;i++){
            let image;
            pieces.forEach((p) => {
                if(p.x === i && p.y === j){
                    image=p.image;
                }
            });

            board.push(
                <Tile key={`${i},${j}`} val={i+j} image={image}></Tile>
                )
        }
    }
    return (
        <div 
            onMouseMove={e => movePiece(e)}
            onMouseDown={e =>grabPiece(e)} 
            onMouseUp={e =>dropPiece(e)} 
            ref={chessboardRef}
            className='cb'>
            {board}
        </div>
    )
}

export default Chessboard
