export const pawnRules = (currentPosition, nextPosition, isWhite) => {
  if (isWhite) {
    if (currentPosition.y < nextPosition.y && currentPosition.x === nextPosition.x) {
        if (currentPosition.y === 2 && nextPosition.y <= 4) {
          return true;
        } else if ((currentPosition.y + 1) === nextPosition.y) {
          return true;
        }
      }

      return false;
  } else {
    if (currentPosition.y > nextPosition.y && currentPosition.x === nextPosition.x) {
      if (currentPosition.y === 7 && nextPosition.y >= 5) {
        return true;
      } else if ((currentPosition.y - 1) === nextPosition.y) {
        return true;
      }
    }

    return false;
  }
};

export const knightRules = (currentPosition, nextPosition) => {
  if (((currentPosition.y + 2) === nextPosition.y || (currentPosition.y - 2) === nextPosition.y) && (((currentPosition.x - 1) === nextPosition.x) || (currentPosition.x + 1) === nextPosition.x)) {
    return true;
  } 

  return false;
};

export const knightRulesV2 = (currentPosition, nextPosition) => {
  const yDifference = Math.abs(currentPosition.y - nextPosition.y);
  const xDifference = Math.abs(currentPosition.x - nextPosition.x);

/*  
  let opposite;
  let adjecent;

  if (yDifference > xDifference) {
    opposite = xDifference;
    adjecent = yDifference;
  } else {
    opposite = yDifference;
    adjecent = xDifference;
  } */

  // hyp * cos(acos())
  //const test = Math.sqrt(Math.pow(yDifference, 2) + Math.pow(xDifference, 2)) * Math.cos(Math.atan(opposite / adjecent));

  if ((xDifference === 2 && yDifference === 1) || (yDifference === 2 && xDifference === 1)) {
    return true;
  }

  return false;
};
