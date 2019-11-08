import React from 'react';
import ReactDOM from 'react-dom';
import Square from '../Square';

describe("Square", () => {
    test("should render without crashing", () => {
        const div = document.createElement('div');
        ReactDOM.render(<Square />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});