import React, { useState, useEffect } from 'react';
import './Game.css';
import Board from "../board/Board";
import VerticalDescription from "../verticalDescription/VerticalDescription";
import HorizontalDescription from "../horizontalDescription/HorizontalDescription";
import { pawnRules, knightRules, bishopRules, kingRules, rookRules, getStartPosition, pieceTypes } from "./GameUtils"; 

function Game() {
  const [pieces, setPieces] = useState([]); //Rename to pieces history or position?
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      setPieces([getStartPosition]);
      setInitialized(true);
    }
    
  }, [initialized]);

  const getSquersInPath = (pathTotalSteps, absoluteDifferenceY, absoluteDifferenceX, currentPositionY, currentPositionX) => {
    const squaresInPath = [];
    const isPositiveSteps = pathTotalSteps > 0;
    let step = isPositiveSteps ? 1 : -1;

    while(step !== pathTotalSteps) {
      const y = absoluteDifferenceY > absoluteDifferenceX ? currentPositionY + step : currentPositionY;
      const x = absoluteDifferenceX > absoluteDifferenceY ? currentPositionX + step : currentPositionX;

      squaresInPath.push({ y, x });

      if (isPositiveSteps) {
        step++;
      } else {
        step--;
      }
    }

    return squaresInPath;
  };

  const checkSquares = (squaresInPath) => {
    let isValidPath = true;

    squaresInPath.some(square => {
      const hasPieceInSquare = Array.from(pieces[pieces.length - 1])
                      .some(piece => piece.positionY === square.y && piece.positionX === square.x);

      if (hasPieceInSquare) {
        isValidPath = false;
        return true;
      }
      
      return false;
    });

    return isValidPath;
  };

  const checkPath = (absoluteDifferenceY, absoluteDifferenceX, currentPositionY, currentPositionX, nextPositionY, nextPositionX) => {
    const yDifference = nextPositionY - currentPositionY;
    const xDifference = nextPositionX - currentPositionX;
    const pathTotalSteps = absoluteDifferenceY > absoluteDifferenceX ? yDifference : xDifference;

    const squaresInPath = getSquersInPath(pathTotalSteps, absoluteDifferenceY, absoluteDifferenceX, currentPositionY, currentPositionX);
    const hasPieceInSquare = checkSquares(squaresInPath);

    return hasPieceInSquare;
  };

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
                    checkPath(absoluteDifferenceY, absoluteDifferenceX, currentPosition.y, currentPosition.x, nextPosition.y, nextPosition.x);
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