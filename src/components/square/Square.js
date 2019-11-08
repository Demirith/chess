import React, { useState, useEffect } from 'react';
import './Square.css';

function Square(props) {
  const [squareClassName, setSquareClassName] = useState(props.isDefaultColor ?  "pieces pieces--pawn" : "pieces pieces--pawn-black");

  useEffect(() => {
    if(props.isSelected) {
      setSquareClassName(props.isDefaultColor ?  "board__square board__square--selected" : "board__square board__square--blue board__square--selected");
    } else {
      setSquareClassName(props.isDefaultColor ?  "board__square" : "board__square board__square--blue");
    }
  }, [props.isSelected, props.isDefaultColor]);

  return (
        <div data-cy={ "square" } className={ squareClassName } onClick={ () => props.squareClicked(props.id) }>
          { props.piece ? props.piece : "" }
        </div>
  );
}

export default Square;
