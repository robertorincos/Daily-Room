import React, { useState, useEffect } from 'react';
import { rooms } from '../../data/rooms';
import { checkGuess, STATUS } from '../../utils/gameLogic';
import { getRoomImage } from '../../utils/images';
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

    if (guesses.some(g => g.room.id === guessedRoom.id)) {
      alert('You have already guessed this room!');
      return;
    }

    const result = checkGuess(guessedRoom, targetRoom);
    setGuesses([result, ...guesses]);

    if (guessedRoom.id === targetRoom.id) {
      setGameState('won');
    }
  };

  if (!targetRoom) return <div>Loading...</div>;

  const latestGuess = guesses.length > 0 ? guesses[0].room : null;
  const latestGuessImage = latestGuess ? getRoomImage(latestGuess.name) : null;
  
  const availableRooms = rooms.filter(room => !guesses.some(guess => guess.room.id === room.id));

  return (
    <div className="game-container">
      <div className="game-area">
        <div className="blueprint-section">
            <div className="blueprint-label">BLUEPRINT</div>
            {latestGuessImage && (
                <div className="room-card-container">
                    <img src={latestGuessImage} alt={latestGuess.name} className="room-card-image" />
                </div>
            )}
        </div>
        <div className="inventory-section">
            <div className="inventory-header">
                <h2>INVENTORY / GUESSES</h2>
                <RoomInput onGuess={handleGuess} rooms={availableRooms} disabled={gameState !== 'playing'} />
            </div>
            <div className="inventory-list-container">
                <GuessList guesses={guesses} />
                {gameState === 'won' && <div className="result-message">You found the room!</div>}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
