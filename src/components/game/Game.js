import React, { useState, useEffect } from 'react';
import './Game.css';
import Board from "../board/Board";
import VerticalDescription from "../verticalDescription/VerticalDescription";
import HorizontalDescription from "../horizontalDescription/HorizontalDescription";
import { pawnRules, knightRules, bishopRules, kingRules, rookRules, getStartPosition, pieceTypes, checkPath } from "./GameUtils"; 

function Game() {
  const [pieces, setPieces] = useState([]); //Rename to pieces history or position?
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      setPieces([getStartPosition]);
      setInitialized(true);
    }
    
  }, [initialized]);

  const rules = (pieceType, isWhite, currentPosition, nextPosition) => {
    let validMove = false;

    const absoluteDifferenceY = Math.abs(currentPosition.y - nextPosition.y);
    const absoluteDifferenceX = Math.abs(currentPosition.x - nextPosition.x);

    switch (pieceType) {
      case pieceTypes.Pawn:
        validMove = pawnRules(currentPosition, nextPosition, isWhite); //refactor
        break;
      case pieceTypes.Rook:
        validMove = rookRules(absoluteDifferenceY, absoluteDifferenceX) && 
                    checkPath(absoluteDifferenceY, absoluteDifferenceX, currentPosition.y, currentPosition.x, nextPosition.y, nextPosition.x, pieces);
        break;
      case pieceTypes.Knight:
        validMove = knightRules(absoluteDifferenceY, absoluteDifferenceX);
        break;
      case pieceTypes.Bishop:
        validMove = bishopRules(absoluteDifferenceY, absoluteDifferenceX);
        break;
      case pieceTypes.King:
        validMove = kingRules(absoluteDifferenceY, absoluteDifferenceX);
        break;
      case pieceTypes.Queen:
        validMove = true;
        break;
      default:
        break;
    }

    return validMove;
  };

  return (
      <div className="game-wrapper">
          <VerticalDescription />
          <Board pieces={ pieces } setPieces={ setPieces } rules={ rules } />
          <HorizontalDescription />
      </div>
  );
}
    
export default Game;