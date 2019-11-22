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
