import React from 'react';
import './VerticalDescription.css';

function VerticalDescription(props) {
  const numbers = [];

  for (let index = 8; index >= 1; index--) {
    numbers.push(
      <span key={ index } className={ "description__numbers" }>
        {index} 
      </span>
      )
  }

  return (
    <div className="description description--vertical">
      { numbers }
    </div>
  );
}

export default VerticalDescription;
