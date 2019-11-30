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

export const knightRules = (yDifference, xDifference) => {
  if ((xDifference === 2 && yDifference === 1) || (yDifference === 2 && xDifference === 1)) {
    return true;
  }

  return false;
};

export const bishopRules = (yDifference, xDifference) => {
  const slope = Math.abs(yDifference / xDifference);

  if (slope === 1) {
    return true;
  }

  return false;
};

export const kingRules = (yDifference, xDifference) => {
  if ((yDifference === 1 && xDifference === 0) || (xDifference === 1 && yDifference === 0) || (xDifference === 1 && yDifference === 1)) {
    return true;
  }

  return false;
};

export const rookRules = (yDifference, xDifference) => {
  if (yDifference === 0 || xDifference === 0) {
    return true;
  }

  return false;
};