import React, { useState, useEffect } from 'react';
import './Game.css';
import Board from "../Board/Board";
import VerticalDescription from "../VerticalDescription/VerticalDescription";
import HorizontalDescription from "../HorizontalDescription/HorizontalDescription";
import { getStartPosition, rules } from "./GameUtils";

function Game() {
  const [pieces, setPieces] = useState([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      setPieces([getStartPosition]);
      setInitialized(true);
    }

  }, [initialized]);

  return (
      <div className="game-wrapper">
          <VerticalDescription />
          <Board pieces={ pieces } setPieces={ setPieces } rules={ rules } />
          <HorizontalDescription />
      </div>
  );
}
    
export default Game;