import React, { useState, useEffect, useContext } from 'react';
import './Game.css';
import Board from "../Board/Board";
import VerticalDescription from "../VerticalDescription/VerticalDescription";
import HorizontalDescription from "../HorizontalDescription/HorizontalDescription";
import { pawnRules, knightRules, bishopRules, kingRules, rookRules, getStartPosition, pieceTypes, checkPath } from "./GameUtils";
import { ErrorContext } from "../ErrorBoundary/ErrorBoundary";

function Game() {
  const [pieces, setPieces] = useState([]); //Rename to pieces history or position?
  const [initialized, setInitialized] = useState(false);
  const report = useContext(ErrorContext);

  useEffect(() => {
    if (!initialized) {
      setPieces([getStartPosition]);
      setInitialized(true);
    }

  }, [initialized]);

  const rules = (pieceType, isWhite, currentPosition, nextPosition) => {
    let validMove = false;

    try {
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
    } catch (e) {
      report(e);
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