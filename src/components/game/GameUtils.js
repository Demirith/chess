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

export const checkPath = (absoluteDifferenceY, absoluteDifferenceX, currentPositionY, currentPositionX, nextPositionY, nextPositionX, pieces) => {
  const yDifference = nextPositionY - currentPositionY;
  const xDifference = nextPositionX - currentPositionX;
  const pathTotalSteps = absoluteDifferenceY > absoluteDifferenceX ? yDifference : xDifference;

  const squaresInPath = getSquersInPath(pathTotalSteps, absoluteDifferenceY, absoluteDifferenceX, currentPositionY, currentPositionX);
  const hasPieceInSquare = checkSquares(squaresInPath, pieces);

  return hasPieceInSquare;
};

const getSquersInPath = (pathTotalSteps, absoluteDifferenceY, absoluteDifferenceX, currentPositionY, currentPositionX) => {
  const squaresInPath = [];
  const isPositiveSteps = pathTotalSteps > 0;
  let step = isPositiveSteps ? 1 : -1;

  while(step !== pathTotalSteps) {
    const y = absoluteDifferenceY > absoluteDifferenceX ? currentPositionY + step : currentPositionY;
    const x = absoluteDifferenceX > absoluteDifferenceY ? currentPositionX + step : currentPositionX;

    squaresInPath.push({ y, x });

    if (isPositiveSteps) {
      step++;
    } else {
      step--;
    }
  }

  return squaresInPath;
};

const checkSquares = (squaresInPath, pieces) => {
  let isValidPath = true;

  squaresInPath.some(square => {
    const hasPieceInSquare = Array.from(pieces[pieces.length - 1])
                    .some(piece => piece.positionY === square.y && piece.positionX === square.x);

    if (hasPieceInSquare) {
      isValidPath = false;
      return true;
    }
    
    return false;
  });

  return isValidPath;
};

export const getStartPosition = [
  { "id": "rook8a", "isWhite": false, "type": 2, "positionY": 8, "positionX": 1 },
  { "id": "knight8b", "isWhite": false, "type": 3, "positionY": 8, "positionX": 2 },
  { "id": "bishop8c", "isWhite": false, "type": 4, "positionY": 8, "positionX": 3 },
  { "id": "queen8d", "isWhite": false, "type": 5, "positionY": 8, "positionX": 4 },
  { "id": "king8e", "isWhite": false, "type": 6, "positionY": 8, "positionX": 5 },
  { "id": "bishop8f", "isWhite": false, "type": 4, "positionY": 8, "positionX": 6 },
  { "id": "knight8g", "isWhite": false, "type": 3, "positionY": 8, "positionX": 7 },
  { "id": "rook8h", "isWhite": false, "type": 2, "positionY": 8, "positionX": 8 },
  { "id": "pawn7a", "isWhite": false, "type": 1, "positionY": 7, "positionX": 1 },
  { "id": "pawn7b", "isWhite": false, "type": 1, "positionY": 7, "positionX": 2 },
  { "id": "pawn7c", "isWhite": false, "type": 1, "positionY": 7, "positionX": 3 },
  { "id": "pawn7d", "isWhite": false, "type": 1, "positionY": 7, "positionX": 4 },
  { "id": "pawn7e", "isWhite": false, "type": 1, "positionY": 7, "positionX": 5 },
  { "id": "pawn7f", "isWhite": false, "type": 1, "positionY": 7, "positionX": 6 },
  { "id": "pawn7g", "isWhite": false, "type": 1, "positionY": 7, "positionX": 7 },
  { "id": "pawn7h", "isWhite": false, "type": 1, "positionY": 7, "positionX": 8 },
  { "id": "pawn2a", "isWhite": true, "type": 1, "positionY": 2, "positionX": 1 },
  { "id": "pawn2b", "isWhite": true, "type": 1, "positionY": 2, "positionX": 2 },
  { "id": "pawn2c", "isWhite": true, "type": 1, "positionY": 2, "positionX": 3 },
  { "id": "pawn2d", "isWhite": true, "type": 1, "positionY": 2, "positionX": 4 },
  { "id": "pawn2e", "isWhite": true, "type": 1, "positionY": 2, "positionX": 5 },
  { "id": "pawn2f", "isWhite": true, "type": 1, "positionY": 2, "positionX": 6 },
  { "id": "pawn2g", "isWhite": true, "type": 1, "positionY": 2, "positionX": 7 },
  { "id": "pawn2h", "isWhite": true, "type": 1, "positionY": 2, "positionX": 8 },
  { "id": "rook1a", "isWhite": true, "type": 2, "positionY": 1, "positionX": 1 },
  { "id": "knight1b", "isWhite": true, "type": 3, "positionY": 1, "positionX": 2 },
  { "id": "bishop1c", "isWhite": true, "type": 4, "positionY": 1, "positionX": 3 },
  { "id": "queen1d", "isWhite": true, "type": 5, "positionY": 1, "positionX": 4 },
  { "id": "king1e", "isWhite": true, "type": 6, "positionY": 1, "positionX": 5 },
  { "id": "bishop1f", "isWhite": true, "type": 4, "positionY": 1, "positionX": 6 },
  { "id": "knight1g", "isWhite": true, "type": 3, "positionY": 1, "positionX": 7 },
  { "id": "rook1h", "isWhite": true, "type": 2, "positionY": 1, "positionX": 8 },
];

export const pieceTypes = {
  Pawn: 1,
  Rook: 2,
  Knight: 3,
  Bishop: 4,
  Queen: 5,
  King: 6
};

export const rules = (pieceType, isWhite, currentPosition, nextPosition, pieces) => {
  let validMove = false;

    const absoluteDifferenceY = Math.abs(currentPosition.y - nextPosition.y);
    const absoluteDifferenceX = Math.abs(currentPosition.x - nextPosition.x);

    switch (pieceType) {
      case pieceTypes.Pawn:
        validMove = pawnRules(currentPosition, nextPosition, isWhite); //refactor
        break;
      case pieceTypes.Rook:
        validMove =
          rookRules(absoluteDifferenceY, absoluteDifferenceX) &&
          checkPath(
            absoluteDifferenceY,
            absoluteDifferenceX,
            currentPosition.y,
            currentPosition.x,
            nextPosition.y,
            nextPosition.x,
            pieces
          );
        break;
      case pieceTypes.Knight:
        validMove = knightRules(absoluteDifferenceY, absoluteDifferenceX);
        break;
      case pieceTypes.Bishop:
        validMove = bishopRules(absoluteDifferenceY, absoluteDifferenceX);
        break;
      case pieceTypes.King:
        validMove = kingRules(absoluteDifferenceY, absoluteDifferenceX);
        break;
      case pieceTypes.Queen: // TODO: not done. Passing throught pieces
        validMove = true;
        break;
      default:
        break;
    }

  return validMove;
};