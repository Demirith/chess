import React, { useState } from "react";
import "./Game.css";
import Board from "../board/Board";
import VerticalDescription from "../verticalDescription/VerticalDescription";
import HorizontalDescription from "../horizontalDescription/HorizontalDescription";
import { getStartPosition } from "./GameUtils";

function Game() {
  const [pieces, setPieces] = useState(getStartPosition);
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);

  return (
    <div className="game-wrapper">
      <VerticalDescription />
      <Board
        pieces={pieces}
        setPieces={setPieces}
        isWhiteTurn={isWhiteTurn}
        setIsWhiteTurn={setIsWhiteTurn}
      />
      <HorizontalDescription />
    </div>
  );
}

export default Game;
