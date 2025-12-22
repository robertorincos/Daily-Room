import React from 'react';
import { ATTRIBUTES, STATUS } from '../../utils/gameLogic';
import './GuessRow.css';

const GuessRow = ({ guess }) => {
  const { room, results } = guess;

  const getStatusClass = (attribute) => {
    return `cell ${results[attribute]}`;
  };

  const formatArray = (arr) => {
    if (!arr || arr.length === 0) return '-';
    return arr.join(', ');
  };

  return (
    <div className="guess-row">
      <div className="cell name-cell">{room.name}</div>
      <div className={getStatusClass(ATTRIBUTES.DOORS)}>{room.doors}</div>
      <div className={getStatusClass(ATTRIBUTES.PAY)}>{formatArray(room.pay)}</div>
      <div className={getStatusClass(ATTRIBUTES.RECEIVES)}>{formatArray(room.receives)}</div>
      <div className={getStatusClass(ATTRIBUTES.COLOR)}>{room.color}</div>
      <div className={getStatusClass(ATTRIBUTES.DIRECTIONS)}>{formatArray(room.directions)}</div>
    </div>
  );
};

export default GuessRow;
