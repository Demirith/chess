import React from 'react';
import ReactDOM from 'react-dom';
import Piece from '../Piece';

describe("Piece", () => {
    test("should render without crashing", () => {
        const div = document.createElement('div');
        ReactDOM.render(<Piece />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});