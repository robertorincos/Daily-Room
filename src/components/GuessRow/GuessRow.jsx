import React from 'react';
import { ATTRIBUTES, STATUS } from '../../utils/gameLogic';
import { getRoomImage } from '../../utils/images';
import './GuessRow.css';

const GuessRow = ({ guess }) => {
  const { room, results } = guess;
  const roomImage = getRoomImage(room.name);

  const getStatusClass = (attribute) => {
    return `cell ${results[attribute]}`;
  };

  const formatArray = (arr) => {
    if (!arr || arr.length === 0) return '-';
    return arr.join(', ');
  };

  return (
    <div className="guess-row-container">
        <div className="guess-image-container">
            {roomImage && <img src={roomImage} alt={room.name} className="guess-image" />}
        </div>
        <div className="guess-data-grid">
            <div className="cell name-cell">
                <span>{room.name}</span>
            </div>
            <div className={getStatusClass(ATTRIBUTES.DOORS)}>{room.doors}</div>
            <div className={getStatusClass(ATTRIBUTES.PAY)}>{formatArray(room.pay)}</div>
            <div className={getStatusClass(ATTRIBUTES.RECEIVES)}>{formatArray(room.receives)}</div>
            <div className={getStatusClass(ATTRIBUTES.COLOR)}>{room.color}</div>
            <div className={getStatusClass(ATTRIBUTES.DIRECTIONS)}>{formatArray(room.directions)}</div>
        </div>
    </div>
  );
};

export default GuessRow;
