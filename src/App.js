import React from 'react';
import './App.css';
import Game from "./components/Game/Game";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

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
