import React, { useState, useEffect }  from 'react';
import './Piece.css';

// Rename? What does this function do? It returns a piece type based on type passed in? Is this realy a piece or more some util function? 
function Pawn(props) { 
    const [pieceType, setPieceType] = useState();
    const [className, setClassName] = useState();

    useEffect(() => {
        setPieceType(() => {
            switch (props.type) {
            case 1:
                return "pawn";
            case 2:
                return "rook";
            case 3:
                return "knight";
            case 4:
                return "bishop";
            case 5:
                return "queen";
            case 6: 
            return "king";
            default:
                return "pawn";
            }
        });

        if (pieceType)
            setClassName(props.isWhite ?  ("pieces pieces--" + pieceType) : ("pieces pieces--" + pieceType + "-black"));

    }, [props.isWhite, props.id, props.type, pieceType]);

    return (
        <span data-cy={ "piece" } className={ className }></span>
    );
}

export default Pawn;
