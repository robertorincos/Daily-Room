import React from 'react';
import './RoomInput.css';

const RoomInput = ({ onGuess, rooms, disabled, value, onChange }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onGuess(value);
    }
  };

  return (
    <div className="room-input-wrapper">
      <form onSubmit={handleSubmit} className="room-input-form">
        <input
          list="room-options"
          value={value}
          onChange={(e) => onChange(e.target.value)}
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
