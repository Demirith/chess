import React from 'react';
import ReactDOM from 'react-dom';
import Game from '../Game';

describe("Game", () => {
    test("should render without crashing", () => {
        const div = document.createElement('div');
        ReactDOM.render(<Game />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});