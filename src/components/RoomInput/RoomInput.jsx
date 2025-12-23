import React, { useState } from 'react';
import { getRoomImage } from '../../utils/images';
import './RoomInput.css';

const RoomInput = ({ onGuess, rooms, disabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onGuess(input);
      setInput('');
    }
  };

  const previewImage = getRoomImage(input);

  return (
    <div className="room-input-wrapper">
      {previewImage && (
        <div className="room-preview">
          <img src={previewImage} alt="Room Preview" />
        </div>
      )}
      <form onSubmit={handleSubmit} className="room-input-form">
        <input
          list="room-options"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter room name..."
          disabled={disabled}
          className="room-input"
        />
        <datalist id="room-options">
          {rooms.map(room => (
            <option key={room.id} value={room.name} />
          ))}
        </datalist>
        <button type="submit" disabled={disabled} className="guess-button">GUESS</button>
      </form>
    </div>
  );
};

export default RoomInput;
