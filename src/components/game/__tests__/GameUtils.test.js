import { pawnRules } from '../utils/GameUtils';

describe("Game rules", () => {
    describe("Pawn", () => {
        describe("White", () => { 
            test("should be valid to move one position forward", () => {
                //Arrange
                const isWhite = true;
                const currentPosition = {
                    y: 2,
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
    
            test("should not be valid to move in x-axies", () => {
                const isWhite = true;
                //Arrange
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
            test("should be valid to move one position forward for black pawn", () => {
                //Arrange
                const isWhite = false;
                const currentPosition = {
                    y: 7,
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
        })
    });
});