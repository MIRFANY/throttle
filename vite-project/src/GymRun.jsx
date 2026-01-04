import React, { useState, useEffect, useRef } from 'react';
import './GymRun.css';

const GymRun = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  
  const runnerRef = useRef(null);
  const obstacleRef = useRef(null);

  const jump = () => {
    if (!isJumping && !isGameOver) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 500);
    }
  };

  useEffect(() => {
    if (isGameOver) return;

    const gameLoop = setInterval(() => {
      // 1. Increment Score
      setScore((s) => s + 1);

      // 2. Collision Detection Logic
      if (runnerRef.current && obstacleRef.current) {
        const runner = runnerRef.current.getBoundingClientRect();
        const obstacle = obstacleRef.current.getBoundingClientRect();

        if (
          obstacle.left < runner.right &&
          obstacle.right > runner.left &&
          obstacle.top < runner.bottom
        ) {
          setIsGameOver(true);
        }
      }
    }, 50);

    return () => clearInterval(gameLoop);
  }, [isGameOver]);

  const resetGame = () => {
    setScore(0);
    setIsGameOver(false);
  };

  return (
    <div className="game-screen" onClick={jump}>
      <div className="score-board">Protein: {score}g</div>
      
      <div className="track">
        <div 
          ref={runnerRef} 
          className={`runner ${isJumping ? 'jump' : ''}`}
        >💪</div>
        
        {!isGameOver && (
          <div ref={obstacleRef} className="obstacle">🍕</div>
        )}
      </div>

      {isGameOver && (
        <div className="overlay">
          <h2>DIET BROKEN!</h2>
          <button onClick={resetGame}>Try Again</button>
        </div>
      )}
    </div>
  );
};

export default GymRun;