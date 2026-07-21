import React, { useState, useEffect, useCallback, useContext } from "react";
import "./Board.css";
import Square from "../square/Square";
import PieceComponent from "../piece/Piece";
import { rules, isKingInCheck } from "../piece/PiecesRules";
import { ErrorContext } from "../errorBoundary/ErrorBoundary";

const deselectSquareInArray = (squares, selectedSquare) => {
  return squares.map((square) => {
    if (square.id === selectedSquare.id) {
      return { ...square, isSelected: false };
    } else {
      return square;
    }
  });
};

const selectSquareInArray = (squares, clickedSquare) => {
  return squares.map((square) => {
    if (square.id === clickedSquare.id) {
      return { ...square, isSelected: true };
    } else {
      return square;
    }
  });
};

const applyMoveToPieces = (previousSelectedPiece, clickedSquare, pieces) => {
  return pieces
    .filter(
      (piece) =>
        piece.id === previousSelectedPiece.id ||
        piece.positionY !== clickedSquare.positionY ||
        piece.positionX !== clickedSquare.positionX
    )
    .map((piece) => {
      if (piece.id === previousSelectedPiece.id) {
        return {
          ...piece,
          positionY: clickedSquare.positionY,
          positionX: clickedSquare.positionX,
        };
      } else {
        return piece;
      }
    });
};

export const wouldLeaveOwnKingInCheck = (previousSelectedPiece, clickedSquare, pieces) => {
  const resultingPieces = applyMoveToPieces(
    previousSelectedPiece,
    clickedSquare,
    pieces
  );

  return isKingInCheck(previousSelectedPiece.isWhite, resultingPieces);
};

const shouldDeselectPreviousSquare = (selectedSquare, id) =>
  selectedSquare && selectedSquare !== id;

const shouldHighlightSquare = (copyPieces, clickedSquare, isWhiteTurn) => {
  return copyPieces.find(
    (piece) =>
      Object.is(piece.positionY, clickedSquare.positionY) &&
      Object.is(piece.positionX, clickedSquare.positionX) &&
      Object.is(piece.isWhite, isWhiteTurn)
  );
};

const getPreviousSelectedPiece = (copyPieces, selectedSquare) =>
  copyPieces.find(
    (piece) =>
      Object.is(piece.positionY, selectedSquare.positionY) &&
      Object.is(piece.positionX, selectedSquare.positionX)
  );

const shouldMovePiece = ({
  previousSelectedPiece,
  rules,
  report,
  currentPosition,
  nextPosition,
  pieces,
}) => {
  return (
    previousSelectedPiece &&
    rules(
      previousSelectedPiece.type,
      previousSelectedPiece.isWhite,
      currentPosition,
      nextPosition,
      pieces,
      report
    )
  );
};

function Board({ pieces, setPieces, isWhiteTurn, setIsWhiteTurn }) {
  const [squares, setSquares] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState();
  const [initialized, setInitialized] = useState(false);
  const [squaresAndPieces, setSquaresAndPieces] = useState([]);
  const report = useContext(ErrorContext);

  const squareClicked = useCallback(
    (id) => {
      // Is this needed? To Copy the array.
      const copyPieces = Array.from(pieces);
      const clickedSquare = squares.find((square) => square.id === id);

      if (shouldDeselectPreviousSquare(selectedSquare, id)) {
        const copyWithDeselectedSquares = deselectSquareInArray(
          squares,
          selectedSquare
        );
        setSquares(copyWithDeselectedSquares);
        setSelectedSquare(null);
      }

      if (shouldHighlightSquare(copyPieces, clickedSquare, isWhiteTurn)) {
        const newSelectedSquare = { ...clickedSquare, isSelected: true };
        const copyWithSelectedSquares = selectSquareInArray(
          squares,
          clickedSquare
        );

        setSquares(copyWithSelectedSquares);
        setSelectedSquare(newSelectedSquare);
      } else if (selectedSquare) {
        const previousSelectedPiece = getPreviousSelectedPiece(
          copyPieces,
          selectedSquare
        );

        const currentPosition = {
          x: selectedSquare.positionX,
          y: selectedSquare.positionY,
        };
        const nextPosition = {
          x: clickedSquare.positionX,
          y: clickedSquare.positionY,
        };

        if (
          shouldMovePiece({
            previousSelectedPiece,
            rules,
            report,
            currentPosition,
            nextPosition,
            pieces,
          }) &&
          !wouldLeaveOwnKingInCheck(previousSelectedPiece, clickedSquare, copyPieces)
        ) {
          const copyPiecesArrayWithNewPosition = applyMoveToPieces(
            previousSelectedPiece,
            clickedSquare,
            copyPieces
          );

          setPieces(copyPiecesArrayWithNewPosition);
          setIsWhiteTurn(!isWhiteTurn);
        }
      }
    },
    [squares, selectedSquare, report, pieces, setPieces, isWhiteTurn, setIsWhiteTurn]
  );

  useEffect(() => {
    if (!initialized) {
      let isWhite = true;
      const boardLetters = ["a", "b", "c", "d", "e", "f", "g", "h"];
      const boardNumbers = [8, 7, 6, 5, 4, 3, 2, 1];
      let boardIdLetterIndex = 0;
      let boardIdNumbersIndex = 0;
      let squaresArray = [];

      for (let index = 1; index <= 64; index++) {
        const squareId =
          boardNumbers[boardIdNumbersIndex] + boardLetters[boardIdLetterIndex];
        const newSquare = {
          id: squareId,
          isWhite,
          isSelected: false,
          positionY: boardNumbers[boardIdNumbersIndex],
          positionX: boardIdLetterIndex + 1,
        };
        squaresArray.push(newSquare);

        if (!(index % 8 === 0)) {
          isWhite = !isWhite;
          boardIdLetterIndex++;
        } else {
          boardIdNumbersIndex++;
          boardIdLetterIndex = 0;
        }
      }

      setSquares(squaresArray);
      setInitialized(true);
    }

    setSquaresAndPieces(
      squares.map((square, index) => {
        const piece = pieces.find(
          (piece) =>
            Object.is(piece.positionY, square.positionY) &&
            Object.is(piece.positionX, square.positionX)
        );

        if (piece) {
          // We could create specific Pieces instead. It would make it clearer.
          const pieceComponent = (
            <PieceComponent
              isWhite={piece.isWhite}
              id={piece.id}
              type={piece.type}
            />
          );
          return (
            <Square
              key={index}
              id={square.id}
              isWhite={square.isWhite}
              squareClicked={squareClicked}
              isSelected={square.isSelected}
              piece={pieceComponent}
            />
          );
        } else
          return (
            <Square
              key={index}
              id={square.id}
              isWhite={square.isWhite}
              squareClicked={squareClicked}
              isSelected={square.isSelected}
            />
          );
      })
    );
  }, [pieces, squares, initialized, squareClicked]);

  return <div className="board">{squaresAndPieces}</div>;
}

export default Board;
