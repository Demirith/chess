import { pawnRules, knightRules, bishopRules, kingRules, rookRules, checkPath, getStartPosition } from '../GameUtils';

describe.skip("Game rules", () => {
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
        test("Should be able to move two steps vertically and one step horizontally", () => {
            //Arrange
            const yDifference = 2;
            const xDifference = 1;
            let validMove = false;

            //Act 
            validMove = knightRules(yDifference, xDifference);
            
            //Assert
            expect(validMove).toBe(true);
        });

        test("Should be able to move two steps forward and one to the right", () => {
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
        test("Should be able to move diagonally", () => {
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
        test("Should be able to move one step vertically", () => {
            //Arrange
            const yDifference = 1;
            const xDifference = 0;
            let validMove = false;

            //Act 
            validMove = kingRules(yDifference, xDifference);
            
            //Assert
            expect(validMove).toBe(true);
        });

        test("Should be able to move one step horizontally", () => {
            //Arrange
            const yDifference = 0;
            const xDifference = 1;
            let validMove = false;

            //Act 
            validMove = kingRules(yDifference, xDifference);
            
            //Assert
            expect(validMove).toBe(true);
        });

        test("Should be able to move one step diagonally", () => {
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
        test("Should be able to move vertically", () => {
            //Arrange
            const yDifference = 5;
            const xDifference = 0;

            let validMove = false;

            //Act 
            validMove = rookRules(yDifference, xDifference);
            
            //Assert
            expect(validMove).toBe(true);
        });

        test("Should be able to move horizontally", () => {
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

