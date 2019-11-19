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
        return false;
    }
};
