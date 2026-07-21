import { pawnRules, rules, pieceTypes, isKingInCheck } from '../PiecesRules';

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

describe("isKingInCheck", () => {
    test("is true when an opponent rook has a clear line to the king", () => {
        //Arrange
        const pieces = [
            { id: "kingA", isWhite: true, type: pieceTypes.King, positionY: 1, positionX: 5 },
            { id: "rookB", isWhite: false, type: pieceTypes.Rook, positionY: 1, positionX: 1 },
        ];

        //Act
        const inCheck = isKingInCheck(true, pieces);

        //Assert
        expect(inCheck).toBe(true);
    });

    test("is false when the attacking piece's path to the king is blocked", () => {
        //Arrange
        const pieces = [
            { id: "kingA", isWhite: true, type: pieceTypes.King, positionY: 1, positionX: 5 },
            { id: "rookB", isWhite: false, type: pieceTypes.Rook, positionY: 1, positionX: 1 },
            { id: "blockerA", isWhite: true, type: pieceTypes.Pawn, positionY: 1, positionX: 3 },
        ];

        //Act
        const inCheck = isKingInCheck(true, pieces);

        //Assert
        expect(inCheck).toBe(false);
    });

    test("is true when an opponent knight threatens the king", () => {
        //Arrange
        const pieces = [
            { id: "kingA", isWhite: true, type: pieceTypes.King, positionY: 1, positionX: 5 },
            { id: "knightB", isWhite: false, type: pieceTypes.Knight, positionY: 2, positionX: 3 },
        ];

        //Act
        const inCheck = isKingInCheck(true, pieces);

        //Assert
        expect(inCheck).toBe(true);
    });

    test("is true when an opponent pawn threatens the king diagonally", () => {
        //Arrange
        const pieces = [
            { id: "kingA", isWhite: true, type: pieceTypes.King, positionY: 5, positionX: 5 },
            { id: "pawnB", isWhite: false, type: pieceTypes.Pawn, positionY: 6, positionX: 4 },
        ];

        //Act
        const inCheck = isKingInCheck(true, pieces);

        //Assert
        expect(inCheck).toBe(true);
    });

    test("is true when an opponent queen threatens the king diagonally", () => {
        //Arrange
        const pieces = [
            { id: "kingA", isWhite: true, type: pieceTypes.King, positionY: 1, positionX: 5 },
            { id: "queenB", isWhite: false, type: pieceTypes.Queen, positionY: 5, positionX: 1 },
        ];

        //Act
        const inCheck = isKingInCheck(true, pieces);

        //Assert
        expect(inCheck).toBe(true);
    });

    test("is false when no opponent piece can reach the king", () => {
        //Arrange
        const pieces = [
            { id: "kingA", isWhite: true, type: pieceTypes.King, positionY: 1, positionX: 5 },
            { id: "rookB", isWhite: false, type: pieceTypes.Rook, positionY: 8, positionX: 1 },
        ];

        //Act
        const inCheck = isKingInCheck(true, pieces);

        //Assert
        expect(inCheck).toBe(false);
    });

    test("is false when the only piece that could reach the square is the same color as the king", () => {
        //Arrange
        const pieces = [
            { id: "kingA", isWhite: true, type: pieceTypes.King, positionY: 1, positionX: 5 },
            { id: "rookA", isWhite: true, type: pieceTypes.Rook, positionY: 1, positionX: 1 },
        ];

        //Act
        const inCheck = isKingInCheck(true, pieces);

        //Assert
        expect(inCheck).toBe(false);
    });

    test("is false when the given color's king isn't on the board", () => {
        //Arrange
        const pieces = [
            { id: "rookB", isWhite: false, type: pieceTypes.Rook, positionY: 1, positionX: 1 },
        ];

        //Act
        const inCheck = isKingInCheck(true, pieces);

        //Assert
        expect(inCheck).toBe(false);
    });
});
