import { pawnRules, rules, pieceTypes } from '../PiecesRules';

describe("Pawn capture rules", () => {
    describe("White", () => {
        test("can capture one square diagonally forward when an opponent piece is there", () => {
            //Arrange
            const currentPosition = { y: 4, x: 4 };
            const nextPosition = { y: 5, x: 5 };
            const isCapture = true;

            //Act
            const validMove = pawnRules(currentPosition, nextPosition, true, isCapture);

            //Assert
            expect(validMove).toBe(true);
        });

        test("cannot move diagonally when there is nothing to capture", () => {
            //Arrange
            const currentPosition = { y: 4, x: 4 };
            const nextPosition = { y: 5, x: 5 };
            const isCapture = false;

            //Act
            const validMove = pawnRules(currentPosition, nextPosition, true, isCapture);

            //Assert
            expect(validMove).toBe(false);
        });

        test("cannot move straight ahead onto an occupied square", () => {
            //Arrange
            const currentPosition = { y: 4, x: 4 };
            const nextPosition = { y: 5, x: 4 };
            const isCapture = true;

            //Act
            const validMove = pawnRules(currentPosition, nextPosition, true, isCapture);

            //Assert
            expect(validMove).toBe(false);
        });
    });

    describe("Black", () => {
        test("can capture one square diagonally forward when an opponent piece is there", () => {
            //Arrange
            const currentPosition = { y: 5, x: 4 };
            const nextPosition = { y: 4, x: 5 };
            const isCapture = true;

            //Act
            const validMove = pawnRules(currentPosition, nextPosition, false, isCapture);

            //Assert
            expect(validMove).toBe(true);
        });

        test("cannot move diagonally when there is nothing to capture", () => {
            //Arrange
            const currentPosition = { y: 5, x: 4 };
            const nextPosition = { y: 4, x: 5 };
            const isCapture = false;

            //Act
            const validMove = pawnRules(currentPosition, nextPosition, false, isCapture);

            //Assert
            expect(validMove).toBe(false);
        });

        test("cannot move straight ahead onto an occupied square", () => {
            //Arrange
            const currentPosition = { y: 5, x: 4 };
            const nextPosition = { y: 4, x: 4 };
            const isCapture = true;

            //Act
            const validMove = pawnRules(currentPosition, nextPosition, false, isCapture);

            //Assert
            expect(validMove).toBe(false);
        });
    });
});

describe("rules() same-color and capture handling", () => {
    test("rejects a move onto a square occupied by your own piece", () => {
        //Arrange
        const pieces = [
            { id: "rookA", isWhite: true, type: pieceTypes.Rook, positionY: 1, positionX: 1 },
            { id: "pawnA", isWhite: true, type: pieceTypes.Pawn, positionY: 1, positionX: 4 },
        ];
        const currentPosition = { y: 1, x: 1 };
        const nextPosition = { y: 1, x: 4 };
        const report = jest.fn();

        //Act
        const validMove = rules(pieceTypes.Rook, true, currentPosition, nextPosition, pieces, report);

        //Assert
        expect(validMove).toBe(false);
        expect(report).not.toHaveBeenCalled();
    });

    test("allows a rook to capture an opponent piece with a clear path", () => {
        //Arrange
        const pieces = [
            { id: "rookA", isWhite: true, type: pieceTypes.Rook, positionY: 1, positionX: 1 },
            { id: "pawnB", isWhite: false, type: pieceTypes.Pawn, positionY: 1, positionX: 4 },
        ];
        const currentPosition = { y: 1, x: 1 };
        const nextPosition = { y: 1, x: 4 };
        const report = jest.fn();

        //Act
        const validMove = rules(pieceTypes.Rook, true, currentPosition, nextPosition, pieces, report);

        //Assert
        expect(validMove).toBe(true);
    });

    test("allows a knight to capture an opponent piece", () => {
        //Arrange
        const pieces = [
            { id: "knightA", isWhite: true, type: pieceTypes.Knight, positionY: 1, positionX: 1 },
            { id: "pawnB", isWhite: false, type: pieceTypes.Pawn, positionY: 3, positionX: 2 },
        ];
        const currentPosition = { y: 1, x: 1 };
        const nextPosition = { y: 3, x: 2 };
        const report = jest.fn();

        //Act
        const validMove = rules(pieceTypes.Knight, true, currentPosition, nextPosition, pieces, report);

        //Assert
        expect(validMove).toBe(true);
    });
});
