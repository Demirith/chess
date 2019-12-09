import React, { useState, useEffect } from 'react';
import './Square.css';

function Square(props) {
  const [squareClassName, setSquareClassName] = useState(props.isWhite ?  "pieces pieces--pawn" : "pieces pieces--pawn-black");

  useEffect(() => {
    if(props.isSelected) {
      setSquareClassName(props.isWhite ?  "board__square board__square--selected" : "board__square board__square--blue board__square--selected");
    } else {
      setSquareClassName(props.isWhite ?  "board__square" : "board__square board__square--blue");
    }
  }, [props.isSelected, props.isWhite]);

  return (
        <div data-cy={ "square" } className={ squareClassName } onClick={ () => props.squareClicked(props.id) }>
          { props.piece ? props.piece : "" }
        </div>
  );
}

export default Square;
