import React, { useState, useEffect, useCallback } from 'react';
import './Board.css';
import Square from "../square/Square";
import PieceComponent from "../piece/Piece";

function Board(props) {
  const [squares, setSquares] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState();
  const [initialized, setInitialized] = useState(false);
  const [squaresAndPieces, setSquaresAndPieces] = useState([]);

  const squareClicked = useCallback(
    (id) => {
      const copyPieces = Array.from(props.pieces[props.pieces.length - 1]);
      const copySquares = Array.from(squares);
      const clickedSquare = copySquares.find(square => square.id === id);

      //deselect previous selected square
      if (selectedSquare && selectedSquare !== id) {
        const previousSelectedSquare = copySquares.find(previousSelectedSquare => previousSelectedSquare.id === selectedSquare.id);
        previousSelectedSquare.isSelected = false;

        setSquares(copySquares);
      }
      
      //check if any piece is on clicked square
      //do not higlight if empty square
      if (copyPieces.find(piece => Object.is(piece.positionY, clickedSquare.positionY) && Object.is(piece.positionX, clickedSquare.positionX))) {
        clickedSquare.isSelected = !clickedSquare.isSelected;
        setSelectedSquare(clickedSquare);
      } else if(selectedSquare) {
        //get piece from previous square
        const previousSelectedPiece = copyPieces.find(piece => Object.is(piece.positionY, selectedSquare.positionY) && Object.is(piece.positionX, selectedSquare.positionX));
        const currentPosition = { x: selectedSquare.positionX, y: selectedSquare.positionY };
        const nextPosition = { x: clickedSquare.positionX, y: clickedSquare.positionY };

        //Update piece position
        if(previousSelectedPiece && props.rules(previousSelectedPiece.type, currentPosition, nextPosition)) {
          previousSelectedPiece.positionY = clickedSquare.positionY;
          previousSelectedPiece.positionX = clickedSquare.positionX;

          //copy pieces array and add new array of pieces
          const copyPiecesArray = Array.from(props.pieces);
          copyPiecesArray.push(copyPieces);
          props.setPieces(copyPiecesArray);
        }
      }
    },
    [squares, props, selectedSquare]
  );

  useEffect(() => {
    if (!initialized) {
      let isDefaultColor = true;
      const boardLetters = ["a", "b", "c", "d", "e", "f", "g", "h"];
      const boardNumbers = [8, 7, 6, 5, 4, 3, 2, 1];
      let boardIdLetterIndex = 0;
      let boardIdNumbersIndex = 0;
      let squaresArray = [];

      for (let index = 1; index <= 64; index++) {
        const squareId = boardNumbers[boardIdNumbersIndex] + boardLetters[boardIdLetterIndex];
        const newSquare = { id: squareId, isDefaultColor, isSelected: false, positionY: boardNumbers[boardIdNumbersIndex], positionX: boardIdLetterIndex + 1 };
        squaresArray.push(newSquare);
        
        if (!(index % 8 === 0)) {
          isDefaultColor = !isDefaultColor;
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
        //test what is the fastes way to get copy from last element in array
        const lastPieces = Array.from(props.pieces[props.pieces.length - 1]);
        const piece = lastPieces.find(piece => Object.is(piece.positionY, square.positionY) && Object.is(piece.positionX, square.positionX));

        if (piece) {
          const pieceComponent = <PieceComponent isDefaultColor={ piece.isDefaultColor } id={ piece.id } type={ piece.type } />;
          return <Square key={ index } id={ square.id } isDefaultColor={ square.isDefaultColor } squareClicked={ squareClicked } isSelected={ square.isSelected } piece={ pieceComponent } />;
        } else
          return <Square key={ index } id={ square.id } isDefaultColor={ square.isDefaultColor } squareClicked={ squareClicked } isSelected={ square.isSelected } />;
      }));

  }, [props.pieces, squares, initialized, squareClicked]);

  return (
    <div className="board">
      {
        squaresAndPieces
      }
    </div>
  );
}

export default Board;
