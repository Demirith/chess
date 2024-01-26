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
        let validMove = false;

        //Act 
        validMove = checkPath(currentPosition, nerxtPostition, pieces);
        
        //Assert
        expect(validMove).toBe(false);
    });


    test.skip("Should not be a valid move if piece is in path and moving diagonally", () => {
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