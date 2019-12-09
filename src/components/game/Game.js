import React, { useState, useEffect, useCallback } from 'react';
import './Game.css';
import Board from  "../board/Board";
import VerticalDescription from "../verticalDescription/VerticalDescription";
import HorizontalDescription from "../horizontalDescription/HorizontalDescription";
import { pawnRules, knightRules, bishopRules, kingRules, rookRules } from "./utils/GameUtils"; 
import Square from '../square/Square';

function Game() {
  const [pieces, setPieces] = useState([]); //Rename to pieces history
  const [initialized, setInitialized] = useState(false);

  const pieceTypes = {
    Pawn: 1,
    Rook: 2,
    Knight: 3,
    Bishop: 4,
    Queen: 5,
    King: 6
  };

  const getPiecesDefaultsquareId = useCallback(
    () => {
      const boardLetters = ["a", "b", "c", "d", "e", "f", "g", "h"];
      const boardNumbers = [8, 7, 2, 1];
      let boardIdLetterIndex = 0;
      let boardIdNumbersIndex = 0;
      let id;
      let type;
      let squareId;
  
      for (let index = 1; index <= 32; index++) {
        let isWhite = true;
        squareId = boardNumbers[boardIdNumbersIndex] + boardLetters[boardIdLetterIndex];
        const positionY = boardNumbers[boardIdNumbersIndex];
        const positionX = boardIdLetterIndex + 1;

        if (squareId === "1a") {
          id = "rook" + squareId;
        } else if (squareId === "1b") {
          id = "knight" + squareId;
        } else if (squareId === "1c") {
          id = "bishop" + squareId;
        } else if (squareId === "1d") {
          id = "queen" + squareId;
        } else if (squareId === "1e") {
          id = "king" + squareId;
        } else if (squareId === "1f") {
          id = "bishop" + squareId;
        } else if (squareId === "1g") {
          id = "knight" + squareId;
        } else if (squareId === "1h") {
          id = "rook" + squareId;
        } else if (squareId.includes("2")) {
          id = "pawn" + squareId;
        } else if (squareId.includes("7")) {
          id = "pawn" + squareId;
          isWhite = false;
        } else if (squareId === "8a") {
          id = "rook" + squareId;
          isWhite = false;
        } else if (squareId === "8b") {
          id = "knight" + squareId;
          isWhite = false;
        } else if (squareId === "8c") {
          id = "bishop" + squareId;
          isWhite = false;
        } else if (squareId === "8d") {
          id = "queen" + squareId;
          isWhite = false;
        } else if (squareId === "8e") {
          id = "king" + squareId;
          isWhite = false;
        } else if (squareId === "8f") {
          id = "bishop" + squareId;
          isWhite = false;
        } else if (squareId === "8g") {
          id = "knight" + squareId;
          isWhite = false;
        } else if (squareId === "8h") {
          id = "rook" + squareId;
          isWhite = false;
        }
  
        if (id.includes("pawn")) {
          type = pieceTypes.Pawn;
        } else if (id.includes("rook")) {
          type = pieceTypes.Rook;
        } else if (id.includes("knight")) {
          type = pieceTypes.Knight;
        } else if (id.includes("bishop")) {
          type = pieceTypes.Bishop;
        } else if (id.includes("queen")) {
          type = pieceTypes.Queen;
        } else if (id.includes("king")) {
          type = pieceTypes.King;
        }
  
        if (!(index % 8 === 0)) {
          boardIdLetterIndex++;
        } else {
          boardIdNumbersIndex++;
          boardIdLetterIndex = 0;
        }
    
        pieces.push({ id, isWhite, type, positionY, positionX }); 
      };
  
      return pieces;
    },
    [pieces, pieceTypes]
  );

  useEffect(() => {
    if (!initialized) {
      setPieces([getPiecesDefaultsquareId()]);
      setInitialized(true);
    }
    
  }, [initialized, getPiecesDefaultsquareId]);

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