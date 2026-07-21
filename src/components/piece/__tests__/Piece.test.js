import React from 'react';
import ReactDOM from 'react-dom';
import Piece from '../Piece';
import { getStartPosition } from '../../game/GameUtils';
import { checkPath, rules, pieceTypes } from '../PiecesRules';

describe.skip("Piece", () => {
    test("should render without crashing", () => {
        const div = document.createElement('div');
        ReactDOM.render(<Piece />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe("Path validation", () => {
    describe("Vertical", () => {
        test("Should not be a valid move if piece is in path and moving vertical up", () => {
            //Arrange
            const currentPosition = { y: 1, x: 1 }
            const nextPostition = { y: 3, x: 1 }
    
            const pieces = getStartPosition; // create test senario 
            let validMove = true;
    
            //Act 
            validMove = checkPath(currentPosition, nextPostition, pieces);
            
            //Assert
            expect(validMove).toBe(false);
        });
    
        test("Should be valid move if no piece is in path and moving vertical down", () => {
            //Arrange
            const currentPosition = { y: 3, x: 1 }
            const nextPostition = { y: 6, x: 1 }
    
            const pieces = getStartPosition; // create test senario 
            let validMove = true;
    
            //Act 
            validMove = checkPath(currentPosition, nextPostition, pieces);
            
            //Assert
            expect(validMove).toBe(true);
        });
    })

    describe("horizontal", () => {
        test("Should not be a valid move if piece is in path and moving horizontal to the right", () => {
            //Arrange
            const currentPosition = { y: 1, x: 1 }
            const nextPostition = { y: 1, x: 3 }
    
            const pieces = getStartPosition; // create test senario 
            let validMove = true;
    
            //Act 
            validMove = checkPath(currentPosition, nextPostition, pieces);
            
            //Assert
            expect(validMove).toBe(false);
        });
    
        test("Should not be a valid move if piece is in path and moving horizontal to the left", () => {
            //Arrange
            const currentPosition = { y: 1, x: 3 }
            const nextPostition = { y: 1, x: 1 }
    
            const pieces = getStartPosition; // create test senario 
            let validMove = true;
    
            //Act 
            validMove = checkPath(currentPosition, nextPostition, pieces);
            
            //Assert
            expect(validMove).toBe(false);
        });
    
        test("Should be a valid move if no piece is in path and moving horizontal to the right", () => {
            //Arrange
            const currentPosition = { y: 3, x: 1 }
            const nextPostition = { y: 3, x: 3 }
    
            const pieces = getStartPosition; // create test senario 
            let validMove = true;
    
            //Act 
            validMove = checkPath(currentPosition, nextPostition, pieces);
            
            //Assert
            expect(validMove).toBe(true);
        });

        test("Should be a valid move if no piece is in path and moving horizontal to the left", () => {
            //Arrange
            const currentPosition = { y: 3, x: 3 }
            const nextPostition = { y: 3, x: 1 }
    
            const pieces = getStartPosition; // create test senario 
            let validMove = true;
    
            //Act 
            validMove = checkPath(currentPosition, nextPostition, pieces);
            
            //Assert
            expect(validMove).toBe(true);
        });
    })
    describe("diagonally", () => {
        test("Should not be a valid move if piece is in path and moving diagonally from y1, x3 to y:3, x5 and there is a piece at y2, x4", () => {
            //Arrange
            const currentPosition = { y: 1, x: 3 }
            const nextPostition = { y: 3, x: 5 }
    
            const pieces = getStartPosition;  
            let validMove = true;
    
            //Act 
            validMove = checkPath(currentPosition, nextPostition, pieces);
            
            //Assert
            expect(validMove).toBe(false);
        });

        test("Should not be a valid move if piece is in path and moving diagonally from y1, x3 to y:3, x1 and there is a piece at y2, x2", () => {
            //Arrange
            const currentPosition = { y: 1, x: 3 }
            const nextPostition = { y: 3, x: 1 }
    
            const pieces = getStartPosition;  
            let validMove = true;
    
            //Act 
            validMove = checkPath(currentPosition, nextPostition, pieces);
            
            //Assert
            expect(validMove).toBe(false);
        });

        test("Should be a valid move if no piece is in path and moving diagonally from y5, x3 to y:3, x5", () => {
            //Arrange
            const currentPosition = { y: 5, x: 3 }
            const nextPostition = { y: 3, x: 5 }
    
            const pieces = getStartPosition;  
            let validMove = true;
    
            //Act 
            validMove = checkPath(currentPosition, nextPostition, pieces);
            
            //Assert
            expect(validMove).toBe(true);
        });

        test("Should be a valid move if no piece is in path and moving diagonally from y5, x3 to y:3, x1", () => {
            //Arrange
            const currentPosition = { y: 5, x: 3 }
            const nextPostition = { y: 3, x: 1 }
    
            const pieces = getStartPosition;  
            let validMove = true;
    
            //Act 
            validMove = checkPath(currentPosition, nextPostition, pieces);
            
            //Assert
            expect(validMove).toBe(true);
        });

        test("Should be a valid move if no piece is in path and moving diagonally from y3, x3 to y:5, x1", () => {
            //Arrange
            const currentPosition = { y: 3, x: 3 }
            const nextPostition = { y: 5, x: 1 }
    
            const pieces = getStartPosition;  
            let validMove = true;
    
            //Act 
            validMove = checkPath(currentPosition, nextPostition, pieces);
            
            //Assert
            expect(validMove).toBe(true);
        });

        test("Should be a valid move if no piece is in path and moving diagonally from y3, x3 to y:5, x5", () => {
            //Arrange
            const currentPosition = { y: 3, x: 3 }
            const nextPostition = { y: 5, x: 5 }
    
            const pieces = getStartPosition;  
            let validMove = true;
    
            //Act 
            validMove = checkPath(currentPosition, nextPostition, pieces);
            
            //Assert
            expect(validMove).toBe(true);
        });
    })

    describe("long distance (2+ squares away from the start)", () => {
        test("Should not be a valid move if a piece blocks a square that isn't adjacent to the start", () => {
            //Arrange
            const currentPosition = { y: 1, x: 4 }
            const nextPostition = { y: 1, x: 8 }
            const pieces = [{ id: "blockerA", isWhite: true, type: 1, positionY: 1, positionX: 6 }];

            //Act
            const validMove = checkPath(currentPosition, nextPostition, pieces);

            //Assert
            expect(validMove).toBe(false);
        });

        test("Should be a valid move if the whole multi-square path is clear", () => {
            //Arrange
            const currentPosition = { y: 1, x: 4 }
            const nextPostition = { y: 1, x: 8 }
            const pieces = [];

            //Act
            const validMove = checkPath(currentPosition, nextPostition, pieces);

            //Assert
            expect(validMove).toBe(true);
        });

        test("Should not be a valid move if a piece blocks a square that isn't adjacent to the start, diagonally", () => {
            //Arrange
            const currentPosition = { y: 1, x: 1 }
            const nextPostition = { y: 5, x: 5 }
            const pieces = [{ id: "blockerA", isWhite: true, type: 1, positionY: 3, positionX: 3 }];

            //Act
            const validMove = checkPath(currentPosition, nextPostition, pieces);

            //Assert
            expect(validMove).toBe(false);
        });
    })
});

describe("Queen movement rules", () => {
    const report = () => {};

    test("Should be able to move in a straight line with a clear path", () => {
        //Arrange
        const pieces = [
            { id: "queenA", isWhite: true, type: pieceTypes.Queen, positionY: 1, positionX: 4 },
        ];
        const currentPosition = { y: 1, x: 4 };
        const nextPosition = { y: 1, x: 8 };

        //Act
        const validMove = rules(pieceTypes.Queen, true, currentPosition, nextPosition, pieces, report);

        //Assert
        expect(validMove).toBe(true);
    });

    test("Should be able to move diagonally with a clear path", () => {
        //Arrange
        const pieces = [
            { id: "queenA", isWhite: true, type: pieceTypes.Queen, positionY: 1, positionX: 4 },
        ];
        const currentPosition = { y: 1, x: 4 };
        const nextPosition = { y: 4, x: 7 };

        //Act
        const validMove = rules(pieceTypes.Queen, true, currentPosition, nextPosition, pieces, report);

        //Assert
        expect(validMove).toBe(true);
    });

    test("Should not be able to move like a knight", () => {
        //Arrange
        const pieces = [
            { id: "queenA", isWhite: true, type: pieceTypes.Queen, positionY: 1, positionX: 4 },
        ];
        const currentPosition = { y: 1, x: 4 };
        const nextPosition = { y: 3, x: 5 };

        //Act
        const validMove = rules(pieceTypes.Queen, true, currentPosition, nextPosition, pieces, report);

        //Assert
        expect(validMove).toBe(false);
    });

    test("Should not be able to move through a piece blocking a straight path", () => {
        //Arrange
        const pieces = [
            { id: "queenA", isWhite: true, type: pieceTypes.Queen, positionY: 1, positionX: 4 },
            { id: "blockerA", isWhite: true, type: pieceTypes.Pawn, positionY: 1, positionX: 6 },
        ];
        const currentPosition = { y: 1, x: 4 };
        const nextPosition = { y: 1, x: 8 };

        //Act
        const validMove = rules(pieceTypes.Queen, true, currentPosition, nextPosition, pieces, report);

        //Assert
        expect(validMove).toBe(false);
    });

    test("Should not be able to move through a piece blocking a diagonal path", () => {
        //Arrange
        const pieces = [
            { id: "queenA", isWhite: true, type: pieceTypes.Queen, positionY: 1, positionX: 4 },
            { id: "blockerA", isWhite: true, type: pieceTypes.Pawn, positionY: 2, positionX: 5 },
        ];
        const currentPosition = { y: 1, x: 4 };
        const nextPosition = { y: 4, x: 7 };

        //Act
        const validMove = rules(pieceTypes.Queen, true, currentPosition, nextPosition, pieces, report);

        //Assert
        expect(validMove).toBe(false);
    });
});