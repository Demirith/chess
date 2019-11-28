import React, { useState, useEffect, useCallback } from 'react';
import './Game.css';
import Board from  "../board/Board";
import VerticalDescription from "../verticalDescription/VerticalDescription";
import HorizontalDescription from "../horizontalDescription/HorizontalDescription";
import { pawnRules, knightRules, knightRulesV2 } from "./utils/GameUtils"; 

function Game() {
  const [pieces, setPieces] = useState([]);
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
        let isDefaultColor = true;
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
          id = "king" + squareId;
        } else if (squareId === "1e") {
          id = "queen" + squareId;
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
          isDefaultColor = false;
        } else if (squareId === "8a") {
          id = "rook" + squareId;
          isDefaultColor = false;
        } else if (squareId === "8b") {
          id = "knight" + squareId;
          isDefaultColor = false;
        } else if (squareId === "8c") {
          id = "bishop" + squareId;
          isDefaultColor = false;
        } else if (squareId === "8d") {
          id = "queen" + squareId;
          isDefaultColor = false;
        } else if (squareId === "8e") {
          id = "king" + squareId;
          isDefaultColor = false;
        } else if (squareId === "8f") {
          id = "bishop" + squareId;
          isDefaultColor = false;
        } else if (squareId === "8g") {
          id = "knight" + squareId;
          isDefaultColor = false;
        } else if (squareId === "8h") {
          id = "rook" + squareId;
          isDefaultColor = false;
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
    
        pieces.push({ id, isDefaultColor, type, positionY, positionX }); 
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

  const rules = (pieceType, isWhite, currentPosition, nextPosition) => {
    let validMove = false;

    switch (pieceType) {
      case pieceTypes.Pawn:
        validMove = pawnRules(currentPosition, nextPosition, isWhite);
        break;
      case pieceTypes.Rook:
        console.log("rook clicked");
        break;
      case pieceTypes.Knight:
        validMove = knightRulesV2(currentPosition, nextPosition);
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