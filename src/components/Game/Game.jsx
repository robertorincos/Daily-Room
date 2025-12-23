import React, { useState, useEffect } from 'react';
import { rooms } from '../../data/rooms';
import { checkGuess, STATUS, ATTRIBUTES } from '../../utils/gameLogic';
import { getRoomImage } from '../../utils/images';
import RoomInput from '../RoomInput/RoomInput';
import GuessList from '../GuessList/GuessList';
import stepsIcon from '../../assets/Steps_icon.webp';
import coinIcon from '../../assets/coin_icon.jpg';
import './Game.css';

const Game = () => {
  const [targetRoom, setTargetRoom] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [gameState, setGameState] = useState('playing'); // playing, won, lost
  const [steps, setSteps] = useState(4);
  const [coins, setCoins] = useState(0);
  const [hintMessage, setHintMessage] = useState('');
  const [currentGuess, setCurrentGuess] = useState('');

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
    
    // Calculate coins
    let earnedCoins = 0;
    Object.values(result.results).forEach(status => {
        if (status === STATUS.CORRECT) {
            earnedCoins += 1;
        }
    });
    setCoins(prev => prev + earnedCoins);

    const newGuesses = [result, ...guesses];
    setGuesses(newGuesses);
    setCurrentGuess(''); // Clear input after guess
    
    const newSteps = steps - 1;
    setSteps(newSteps);

    if (guessedRoom.id === targetRoom.id) {
      setGameState('won');
    } else if (newSteps <= 0) {
      setGameState('lost');
    }
  };

  const handleHint = () => {
      if (coins < 1) {
          alert("Not enough coins!");
          return;
      }
      
      // Find unrevealed attributes
      const attributes = Object.values(ATTRIBUTES);
      const unrevealedAttributes = attributes.filter(attr => {
          // Check if we have a correct guess for this attribute
          const hasCorrectGuess = guesses.some(g => g.results[attr] === STATUS.CORRECT);
          return !hasCorrectGuess;
      });

      if (unrevealedAttributes.length === 0) {
          alert("You already know all the attributes!");
          return;
      }

      // Pick random unrevealed
      const randomAttr = unrevealedAttributes[Math.floor(Math.random() * unrevealedAttributes.length)];
      
      // Deduct coin
      setCoins(prev => prev - 1);

      // Reveal
      let value = targetRoom[randomAttr];
      if (Array.isArray(value)) value = value.join(", ");
      setHintMessage(`HINT: The ${randomAttr.toUpperCase()} is ${value}`);
  };

  if (!targetRoom) return <div>Loading...</div>;

  const availableRooms = rooms.filter(room => !guesses.some(guess => guess.room.id === room.id));

  return (
    <div className="game-container">
      <div className="game-area">
        <div className="top-section">
            <div className="inventory-box">
                <div className="inventory-title">[INVENTORY]</div>
                <div className="inventory-content">
                    <div className="coin-display">
                        <img src={coinIcon} alt="Coins" className="icon" />
                        <span>{coins} coins</span>
                    </div>
                    <button className="hint-button" onClick={handleHint} disabled={coins < 1 || gameState !== 'playing'}>
                        ask hint
                    </button>
                </div>
                {hintMessage && <div className="hint-message">{hintMessage}</div>}
            </div>

            <div className="room-preview-container">
                {currentGuess && getRoomImage(currentGuess) && (
                    <img src={getRoomImage(currentGuess)} alt="Room Preview" />
                )}
            </div>

            <div className="input-section">
                <div className="steps-display">
                    <span>Steps: {steps}</span>
                    <img src={stepsIcon} alt="Steps" className="icon" />
                </div>
                <div className="input-wrapper">
                     <RoomInput 
                        onGuess={handleGuess} 
                        rooms={availableRooms} 
                        disabled={gameState !== 'playing'}
                        value={currentGuess}
                        onChange={setCurrentGuess}
                     />
                </div>
            </div>
        </div>
        
        <div className="guesses-section">
            <div className="guesses-label">GUESSES</div>
            <GuessList guesses={guesses} />
            {gameState === 'won' && <div className="result-message">You found the room!</div>}
            {gameState === 'lost' && <div className="result-message">Game Over! The room was {targetRoom.name}</div>}
        </div>
      </div>
    </div>
  );
};

export default Game;
