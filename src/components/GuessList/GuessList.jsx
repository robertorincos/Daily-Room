import React from 'react';
import GuessRow from '../GuessRow/GuessRow';
import './GuessList.css';

const GuessList = ({ guesses }) => {
  return (
    <div className="guess-list-container">
      <div className="guess-header">
        <div className="header-cell">Room</div>
        <div className="header-cell">Doors</div>
        <div className="header-cell">Pay</div>
        <div className="header-cell">Receives</div>
        <div className="header-cell">Color</div>
        <div className="header-cell">Directions</div>
      </div>
      <div className="guess-rows">
        {guesses.map((guess, index) => (
          <GuessRow key={index} guess={guess} />
        ))}
      </div>
    </div>
  );
};

export default GuessList;
