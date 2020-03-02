import React from 'react';
import './App.css';
import Game from "./components/game/Game";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Game />
      </ErrorBoundary>
    </div>
  );
}

export default App;
