import { pawnRules, knightRules, bishopRules, kingRules, rookRules, checkPath, getStartPosition } from '../GameUtils';

describe("Game rules", () => {
    describe("Pawn", () => {
        describe("White", () => { 
            test("should be valid to move one position forward", () => {
                //Arrange
                const isWhite = true;
                const currentPosition = {
                    y: 5,
                    x: 1
                };
        
                const nextPosition = {
                    y: 6,
                    x: 1
                };
        
                //Act
                const validMove = pawnRules(currentPosition, nextPosition, isWhite);
        
                //Assert
                expect(validMove).toBe(true);
            });
    
            test("should be valid to move two positions forward if pawn is at starting position", () => {
                //Arrange
                const isWhite = true;
                const currentPosition = {
                    y: 2,
                    x: 1
                };
        
                const nextPosition = {
                    y: 4,
                    x: 1
                };
        
                //Act
                const validMove = pawnRules(currentPosition, nextPosition, isWhite);
        
                //Assert
                expect(validMove).toBe(true);
            });
    
            test("should not be valid to move back", () => {
                //Arrange
                const isWhite = true;
                const currentPosition = {
                    y: 2,
                    x: 1
                };
        
                const nextPosition = {
                    y: 1,
                    x: 1
                };
        
                //Act
                const validMove = pawnRules(currentPosition, nextPosition, isWhite);
        
                //Assert
                expect(validMove).toBe(false);
            });
    
            test("should not be valid to move sideways in x-axies", () => {
                //Arrange
                const isWhite = true;
                const currentPosition = {
                    y: 2,
                    x: 1
                };
        
                const nextPosition = {
                    y: 2,
                    x: 2
                };
        
                //Act
                const validMove = pawnRules(currentPosition, nextPosition, isWhite);
        
                //Assert
                expect(validMove).toBe(false);
            });
        });

        describe("Black", () => {
            test("should be valid to move one position forward", () => {
                //Arrange
                const isWhite = false;
                const currentPosition = {
                    y: 4,
                    x: 1
                };
        
                const nextPosition = {
                    y: 3,
                    x: 1
                };
        
                //Act
                const validMove = pawnRules(currentPosition, nextPosition, isWhite);
        
                //Assert
                expect(validMove).toBe(true);
            });

            test("should be valid to move two positions forward from starting position", () => {
                //Arrange
                const isWhite = false;
                const currentPosition = {
                    y: 7,
                    x: 1
                };
        
                const nextPosition = {
                    y: 5,
                    x: 1
                };
        
                //Act
                const validMove = pawnRules(currentPosition, nextPosition, isWhite);
        
                //Assert
                expect(validMove).toBe(true);
            });

            test("should not be valid to move back", () => {
                //Arrange
                const isWhite = false;
                const currentPosition = {
                    y: 7,
                    x: 1
                };
        
                const nextPosition = {
                    y: 8,
                    x: 1
                };
        
                //Act
                const validMove = pawnRules(currentPosition, nextPosition, isWhite);
        
                //Assert
                expect(validMove).toBe(false);
            });

            test("should not be valid to move sideways in x-axies", () => {
                //Arrange
                const isWhite = false;
                const currentPosition = {
                    y: 7,
                    x: 1
                };
        
                const nextPosition = {
                    y: 7,
                    x: 2
                };
        
                //Act
                const validMove = pawnRules(currentPosition, nextPosition, isWhite);
        
                //Assert
                expect(validMove).toBe(false);
            });
        })
    });

    describe("Knight", () => {
        describe("Should be able to move two steps vertically and one step horizontally", () => {
            //Arrange
            const yDifference = 2;
            const xDifference = 1;
            let validMove = false;

            //Act 
            validMove = knightRules(yDifference, xDifference);
            
            //Assert
            expect(validMove).toBe(true);
        });

        describe("Should be able to move two steps forward and one to the right", () => {
            //Arrange
            const yDifference = 1;
            const xDifference = 2;
            let validMove = false;

            //Act 
            validMove = knightRules(yDifference, xDifference);
            
            //Assert
            expect(validMove).toBe(true);
        });
    });

    describe("Bishop", () => {
        describe("Should be able to move diagonally", () => {
            //Arrange
            const yDifference = 2;
            const xDifference = 2;
            let validMove = false;

            //Act 
            validMove = bishopRules(yDifference, xDifference);
            
            //Assert
            expect(validMove).toBe(true);
        });
    });

    describe("King", () => {
        describe("Should be able to move one step vertically", () => {
            //Arrange
            const yDifference = 1;
            const xDifference = 0;
            let validMove = false;

            //Act 
            validMove = kingRules(yDifference, xDifference);
            
            //Assert
            expect(validMove).toBe(true);
        });

        describe("Should be able to move one step horizontally", () => {
            //Arrange
            const yDifference = 0;
            const xDifference = 1;
            let validMove = false;

            //Act 
            validMove = kingRules(yDifference, xDifference);
            
            //Assert
            expect(validMove).toBe(true);
        });

        describe("Should be able to move one step diagonally", () => {
            //Arrange
            const yDifference = 1;
            const xDifference = 1;
            let validMove = false;

            //Act 
            validMove = kingRules(yDifference, xDifference);
            
            //Assert
            expect(validMove).toBe(true);
        });
    });

    describe("Rook", () => {
        describe("Should be able to move vertically", () => {
            //Arrange
            const yDifference = 5;
            const xDifference = 0;

            let validMove = false;

            //Act 
            validMove = rookRules(yDifference, xDifference);
            
            //Assert
            expect(validMove).toBe(true);
        });

        describe("Should be able to move horizontally", () => {
            //Arrange
            const yDifference = 0;
            const xDifference = 4;

            let validMove = false;

            //Act 
            validMove = rookRules(yDifference, xDifference);
            
            //Assert
            expect(validMove).toBe(true);
        });
    });
});

describe("Path validation", () => {
    describe("Should not be a valid move if piece is in path and moving vertical", () => {
        //Arrange
        const absoluteDifferenceY = 2;
        const absoluteDifferenceX = 0;

        const currentPositionY = 1;
        const currentPositionX = 1;

        const nextPositionY = 3;
        const nextPositionX = 1;

        const pieces = [getStartPosition]; // create test senario 
        let validMove = false;

        //Act 
        validMove = checkPath(absoluteDifferenceY, absoluteDifferenceX, currentPositionY, currentPositionX, nextPositionY, nextPositionX, pieces);
        
        //Assert
        expect(validMove).toBe(false);
    });

    describe("Should not be a valid move if piece is in path and moving horizontal", () => {
        //Arrange
        const absoluteDifferenceY = 0;
        const absoluteDifferenceX = 2;

        const currentPositionY = 1;
        const currentPositionX = 1;

        const nextPositionY = 1;
        const nextPositionX = 3;

        const pieces = [getStartPosition]; // create test senario 
        let validMove = false;

        //Act 
        validMove = checkPath(absoluteDifferenceY, absoluteDifferenceX, currentPositionY, currentPositionX, nextPositionY, nextPositionX, pieces);
        
        //Assert
        expect(validMove).toBe(false);
    });


    describe("Should not be a valid move if piece is in path and moving diagonally", () => {
        //Arrange
        const absoluteDifferenceY = 2;
        const absoluteDifferenceX = 2;

        const currentPositionY = 1;
        const currentPositionX = 3;

        const nextPositionY = 3;
        const nextPositionX = 5;

        const pieces = [getStartPosition];  //create test senario 
        let validMove = false;

        //Act 
        validMove = checkPath(absoluteDifferenceY, absoluteDifferenceX, currentPositionY, currentPositionX, nextPositionY, nextPositionX, pieces);
        
        //Assert
        expect(true).toBe(false);
    });
});