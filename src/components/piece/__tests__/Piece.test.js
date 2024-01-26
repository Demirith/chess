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
    test("Should not be a valid move if piece is in path and moving vertical", () => {
        //Arrange
        const currentPosition = { y: 1, x: 1 }
        const nerxtPostition = { y: 3, x: 1 }

        const pieces = [getStartPosition]; // create test senario 
        let validMove = true;

        //Act 
        validMove = checkPath(currentPosition, nerxtPostition, pieces);
        
        //Assert
        expect(validMove).toBe(false);
    });

    test("Should not be a valid move if piece is in path and moving horizontal", () => {
        //Arrange
        const currentPosition = { y: 1, x: 1 }
        const nerxtPostition = { y: 1, x: 3 }

        const pieces = [getStartPosition]; // create test senario 
        let validMove = true;

        //Act 
        validMove = checkPath(currentPosition, nerxtPostition, pieces);
        
        //Assert
        expect(validMove).toBe(false);
    });


    test("Should not be a valid move if piece is in path and moving diagonally from y1, x3 to y:3, x5 and there is a piece at y2, x4", () => {
        //Arrange
        const currentPosition = { y: 1, x: 3 }
        const nerxtPostition = { y: 3, x: 5 }

        const pieces = [getStartPosition];  
        let validMove = true;

        //Act 
        validMove = checkPath(currentPosition, nerxtPostition, pieces);
        
        //Assert
        expect(validMove).toBe(false);
    });
});