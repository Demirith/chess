export const pawnRules = (currentPosition, nextPosition, isWhite) => {
  if (isWhite) {
    if (
      currentPosition.y < nextPosition.y &&
      currentPosition.x === nextPosition.x
    ) {
      if (currentPosition.y === 2 && nextPosition.y <= 4) {
        return true;
      } else if (currentPosition.y + 1 === nextPosition.y) {
        return true;
      }
    }

    return false;
  } else {
    if (
      currentPosition.y > nextPosition.y &&
      currentPosition.x === nextPosition.x
    ) {
      if (currentPosition.y === 7 && nextPosition.y >= 5) {
        return true;
      } else if (currentPosition.y - 1 === nextPosition.y) {
        return true;
      }
    }

    return false;
  }
};

export const knightRules = (yDifference, xDifference) => {
  if (
    (xDifference === 2 && yDifference === 1) ||
    (yDifference === 2 && xDifference === 1)
  ) {
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
  if (
    (yDifference === 1 && xDifference === 0) ||
    (xDifference === 1 && yDifference === 0) ||
    (xDifference === 1 && yDifference === 1)
  ) {
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

export const checkPath = (currentPosition, nextPosition, pieces) => {
  const squaresInPath = getSquersInPath(currentPosition, nextPosition);

  return checkSquares(squaresInPath, pieces);
};

const getSquersInPath = (currentPosition, nextPosition) => {
  const yStep = Math.sign(nextPosition.y - currentPosition.y);
  const xStep = Math.sign(nextPosition.x - currentPosition.x);

  const squaresInPath = [];
  let y = currentPosition.y + yStep;
  let x = currentPosition.x + xStep;

  while (y !== nextPosition.y || x !== nextPosition.x) {
    squaresInPath.push({ y, x });
    y += yStep;
    x += xStep;
  }

  return squaresInPath;
};

const checkSquares = (squaresInPath, pieces) => {
  let isValidPath = true;

  squaresInPath.some((square) => {
    const hasPieceInSquare = Array.from(pieces[pieces.length - 1]).some(
      (piece) => piece.positionY === square.y && piece.positionX === square.x
    );

    if (hasPieceInSquare) {
      isValidPath = false;
      return true;
    }

    return false;
  });

  return isValidPath;
};

export const pieceTypes = {
  Pawn: 1,
  Rook: 2,
  Knight: 3,
  Bishop: 4,
  Queen: 5,
  King: 6,
};

export const rules = (
  pieceType,
  isWhite,
  currentPosition,
  nextPosition,
  pieces,
  report
) => {
  let validMove = false;
  const absoluteDifferenceY = Math.abs(currentPosition.y - nextPosition.y);
  const absoluteDifferenceX = Math.abs(currentPosition.x - nextPosition.x);

  try {
    switch (pieceType) {
      case pieceTypes.Pawn:
        validMove = pawnRules(currentPosition, nextPosition, isWhite); //refactor // TODO: not done. Passing throught pieces
        break;
      case pieceTypes.Rook:
        validMove =
          rookRules(absoluteDifferenceY, absoluteDifferenceX) &&
          checkPath(currentPosition, nextPosition, pieces);
        break;
      case pieceTypes.Knight:
        validMove = knightRules(absoluteDifferenceY, absoluteDifferenceX);
        break;
      case pieceTypes.Bishop: // TODO: not done. Passing throught pieces
        validMove = bishopRules(absoluteDifferenceY, absoluteDifferenceX) &&
        checkPath(currentPosition, nextPosition, pieces);
        break;
      case pieceTypes.King:
        validMove = kingRules(absoluteDifferenceY, absoluteDifferenceX);
        break;
      case pieceTypes.Queen:
        validMove =
          (rookRules(absoluteDifferenceY, absoluteDifferenceX) ||
            bishopRules(absoluteDifferenceY, absoluteDifferenceX)) &&
          checkPath(currentPosition, nextPosition, pieces);
        break;
      default:
        break;
    }
  } catch (error) {
    report(error);
  }

  return validMove;
};
