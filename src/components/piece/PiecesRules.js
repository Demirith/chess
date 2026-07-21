export const pawnRules = (currentPosition, nextPosition, isWhite, isCapture) => {
  const xDifference = Math.abs(currentPosition.x - nextPosition.x);

  if (isWhite) {
    if (xDifference === 0 && currentPosition.y < nextPosition.y) {
      if (isCapture) {
        return false;
      } else if (currentPosition.y === 2 && nextPosition.y <= 4) {
        return true;
      } else if (currentPosition.y + 1 === nextPosition.y) {
        return true;
      }
    }

    if (xDifference === 1 && nextPosition.y - currentPosition.y === 1) {
      return isCapture;
    }

    return false;
  } else {
    if (xDifference === 0 && currentPosition.y > nextPosition.y) {
      if (isCapture) {
        return false;
      } else if (currentPosition.y === 7 && nextPosition.y >= 5) {
        return true;
      } else if (currentPosition.y - 1 === nextPosition.y) {
        return true;
      }
    }

    if (xDifference === 1 && currentPosition.y - nextPosition.y === 1) {
      return isCapture;
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

const isOwnPieceAt = (position, isWhite, pieces) =>
  pieces.some(
    (piece) =>
      piece.positionY === position.y &&
      piece.positionX === position.x &&
      piece.isWhite === isWhite
  );

const isOpponentPieceAt = (position, isWhite, pieces) =>
  pieces.some(
    (piece) =>
      piece.positionY === position.y &&
      piece.positionX === position.x &&
      piece.isWhite !== isWhite
  );

const checkSquares = (squaresInPath, pieces) => {
  let isValidPath = true;

  squaresInPath.some((square) => {
    const hasPieceInSquare = pieces.some(
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
    if (isOwnPieceAt(nextPosition, isWhite, pieces)) {
      return false;
    }

    switch (pieceType) {
      case pieceTypes.Pawn:
        validMove = pawnRules(
          currentPosition,
          nextPosition,
          isWhite,
          isOpponentPieceAt(nextPosition, isWhite, pieces)
        );
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

const noopReport = () => {};

export const isKingInCheck = (isWhite, pieces) => {
  const king = pieces.find(
    (piece) => piece.type === pieceTypes.King && piece.isWhite === isWhite
  );

  if (!king) {
    return false;
  }

  const kingPosition = { y: king.positionY, x: king.positionX };

  return pieces.some(
    (piece) =>
      piece.isWhite !== isWhite &&
      rules(
        piece.type,
        piece.isWhite,
        { y: piece.positionY, x: piece.positionX },
        kingPosition,
        pieces,
        noopReport
      )
  );
};
