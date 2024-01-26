import React from 'react';
import ReactDOM from 'react-dom';
import Piece from '../Piece';
import { getStartPosition } from '../../game/GameUtils';
import { checkPath } from '../PiecesRules';

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
    
            const pieces = [getStartPosition]; // create test senario 
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
    
            const pieces = [getStartPosition]; // create test senario 
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
    
            const pieces = [getStartPosition]; // create test senario 
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
    
            const pieces = [getStartPosition]; // create test senario 
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
    
            const pieces = [getStartPosition]; // create test senario 
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
    
            const pieces = [getStartPosition]; // create test senario 
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
    
            const pieces = [getStartPosition];  
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
    
            const pieces = [getStartPosition];  
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
    
            const pieces = [getStartPosition];  
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
    
            const pieces = [getStartPosition];  
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
    
            const pieces = [getStartPosition];  
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
    
            const pieces = [getStartPosition];  
            let validMove = true;
    
            //Act 
            validMove = checkPath(currentPosition, nextPostition, pieces);
            
            //Assert
            expect(validMove).toBe(true);
        });
    })
});