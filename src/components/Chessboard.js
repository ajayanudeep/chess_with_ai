import React from 'react'
import Tile from './Tile';
import { useRef } from 'react';

const verticalAxis=["1","2","3","4","5","6","7","8"];
const horizantalAxis=["a","b","c","d","e","f","g","h"];
function Chessboard() {
    const chessboardRef= useRef(null);
    let activePiece=null;
    const grabPiece = (e) =>{
        const element=e.target;
        console.log(element)
        if(element.classList.contains("coin")){
            console.log(e.target)
            const x=e.clientX -45;
            const y=e.clientY -45;
            element.style.position ="absolute";
            console.log(x)
            console.log(y)
            element.style.left=`${x}px`;
            element.style.top=`${y}px`;
            activePiece=element;
        }
    }
    const movePiece = (e) =>{
        const chess_board = chessboardRef.current;
        if(activePiece && chess_board){
            const minX = parseInt(chess_board.offsetLeft) -25;
            const minY = parseInt(chess_board.offsetTop) -25 ;
            const maxX = parseInt(chess_board.offsetRight) -25;
            const maxY = parseInt(chess_board.offsetBottom) -25;
            let x= e.clientX -45;
            let y=e.clientY -45;
            activePiece.style.position ="absolute";

            if(x<minX) x=minX;
            else if(x > maxX) x=maxX;
            if(y<minY) y=minY;
            else if(y > minY) y=maxY;

            activePiece.style.left=`${x}px`;
            activePiece.style.top=`${y}px`;
        }
        
    }

    const dropPiece =(e) =>{
        if(activePiece){
            
            const x=e.clientX -45;
            const y=e.clientY -45;
            activePiece.style.position ="absolute";
            activePiece.style.left=`${x}px`;
            activePiece.style.top=`${y}px`;
            activePiece=null;
        }
    }

    let board=[],pieces=[];

    for (let index = 0; index < horizantalAxis.length; index++) {
        pieces.push({image:'icons/pawn_w.png', x:index ,y:1} )
    }
    for (let index = 0; index < horizantalAxis.length; index++) {
        pieces.push({image:'icons/pawn_b.png', x:index ,y:6 } )
    }

    for(let p=0;p<2;p++){
        const type = (p===0)?"w":"b";
        const y = (p===0) ? 0:7;
        pieces.push({image:`icons/rook_${type}.png`, x:0 , y:y })
        pieces.push({image:`icons/rook_${type}.png`, x:7 , y:y })
        pieces.push({image:`icons/bishop_${type}.png`, x:5 , y:y })
        pieces.push({image:`icons/bishop_${type}.png`, x:2 , y:y })
        pieces.push({image:`icons/knight_${type}.png`, x:1 , y:y })
        pieces.push({image:`icons/knight_${type}.png`, x:6 , y:y })
        pieces.push({image:`icons/king_${type}.png`, x:4 , y:y })
        pieces.push({image:`icons/queen_${type}.png`, x:3 , y:y })
    }  

    for(let j=verticalAxis.length-1;j>=0;j--){
        for(let i=0;i<horizantalAxis.length;i++){
            let image
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
