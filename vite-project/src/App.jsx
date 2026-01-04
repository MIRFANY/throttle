import React from 'react';
import GymRun from './GymRun';

function App() {
  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>GymRat Dash</h1>
      <p>Click the game area to jump!</p>
      <GymRun />
    </div>
  );
}

export default App;