import React, { useState, useEffect }  from 'react';
import './Piece.css';

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
            setClassName(props.isDefaultColor ?  ("pieces pieces--" + pieceType) : ("pieces pieces--" + pieceType + "-black"));

    }, [props.isDefaultColor, props.id, props.type, pieceType]);

    return (
        <span data-cy={ "piece" } className={ className }></span>
    );
}

export default Pawn;
