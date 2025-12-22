import React, { useState, useEffect } from 'react';
import { rooms } from '../../data/rooms';
import { checkGuess, STATUS } from '../../utils/gameLogic';
import RoomInput from '../RoomInput/RoomInput';
import GuessList from '../GuessList/GuessList';
import './Game.css';

const Game = () => {
  const [targetRoom, setTargetRoom] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [gameState, setGameState] = useState('playing'); // playing, won, lost

  useEffect(() => {
    // Pick a random room for now. In a real "Daily" game, this would be seeded by date.
    const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
    setTargetRoom(randomRoom);
    console.log('Target Room:', randomRoom.name); // For debugging
  }, []);

  const handleGuess = (roomName) => {
    if (gameState !== 'playing') return;

    const guessedRoom = rooms.find(r => r.name.toLowerCase() === roomName.toLowerCase());
    if (!guessedRoom) {
      alert('Room not found!');
      return;
    }

    const result = checkGuess(guessedRoom, targetRoom);
    setGuesses([result, ...guesses]);

    if (guessedRoom.id === targetRoom.id) {
      setGameState('won');
    }
  };

  if (!targetRoom) return <div>Loading...</div>;

  return (
    <div className="game-container">
      <div className="game-area">
        <div className="blueprint-grid">
            {/* Placeholder for the map/grid on the left if we want to mimic the image layout */}
            <div className="grid-visual">
                <h2>BLUEPRINT</h2>
                {/* Grid lines would go here */}
            </div>
        </div>
        <div className="game-controls">
            <h2>INVENTORY / GUESSES</h2>
            <RoomInput onGuess={handleGuess} rooms={rooms} disabled={gameState !== 'playing'} />
            <GuessList guesses={guesses} />
            {gameState === 'won' && <div className="result-message">You found the room!</div>}
        </div>
      </div>
    </div>
  );
};

export default Game;
