import React, { useState } from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Board from "../Board";
import { getStartPosition } from "../../game/GameUtils";

afterEach(cleanup);

// Mirrors how Board.js lays squares out: row 8 (a..h) first, down to row 1,
// so a square's index can be derived from its board position.
const squareIndexFor = (positionY, positionX) =>
  (8 - positionY) * 8 + (positionX - 1);

function TestGame() {
  const [pieces, setPieces] = useState([getStartPosition]);
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);

  return (
    <>
      <div data-testid="turn">{isWhiteTurn ? "white" : "black"}</div>
      <Board
        pieces={pieces}
        setPieces={setPieces}
        isWhiteTurn={isWhiteTurn}
        setIsWhiteTurn={setIsWhiteTurn}
      />
    </>
  );
}

const clickSquare = (container, positionY, positionX) => {
  const squares = container.querySelectorAll('[data-cy="square"]');
  fireEvent.click(squares[squareIndexFor(positionY, positionX)]);
};

const hasSelectedSquare = (container) =>
  container.querySelector(".board__square--selected") !== null;

describe("Board turn enforcement", () => {
  test("white moves first", () => {
    //Arrange
    const { getByTestId } = render(<TestGame />);

    //Assert
    expect(getByTestId("turn").textContent).toBe("white");
  });

  test("clicking a black piece on white's turn is a silent no-op", () => {
    //Arrange
    const { container, getByTestId } = render(<TestGame />);

    //Act - pawn7a is black
    clickSquare(container, 7, 1);

    //Assert
    expect(hasSelectedSquare(container)).toBe(false);
    expect(getByTestId("turn").textContent).toBe("white");
  });

  test("a legal move by white hands the turn to black", () => {
    //Arrange
    const { container, getByTestId } = render(<TestGame />);

    //Act - select white pawn2a, move it to y4 (two-square opening move)
    clickSquare(container, 2, 1);
    clickSquare(container, 4, 1);

    //Assert
    expect(getByTestId("turn").textContent).toBe("black");
  });

  test("an illegal move attempt does not change whose turn it is", () => {
    //Arrange
    const { container, getByTestId } = render(<TestGame />);

    //Act - select white pawn2a, attempt an illegal sideways move
    clickSquare(container, 2, 1);
    clickSquare(container, 2, 2);

    //Assert
    expect(getByTestId("turn").textContent).toBe("white");
  });

  test("white cannot select a piece again once it is black's turn", () => {
    //Arrange
    const { container, getByTestId } = render(<TestGame />);

    //Act - white plays a legal move, then tries to select another white piece
    clickSquare(container, 2, 1);
    clickSquare(container, 4, 1);
    clickSquare(container, 2, 2); // white pawn2b

    //Assert
    expect(getByTestId("turn").textContent).toBe("black");
    expect(hasSelectedSquare(container)).toBe(false);
  });

  test("after white moves, black can select and move their own piece", () => {
    //Arrange
    const { container, getByTestId } = render(<TestGame />);

    //Act - white opens, then black opens
    clickSquare(container, 2, 1);
    clickSquare(container, 4, 1);
    clickSquare(container, 7, 2);
    clickSquare(container, 5, 2);

    //Assert
    expect(getByTestId("turn").textContent).toBe("white");
  });
});
