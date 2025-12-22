export const ATTRIBUTES = {
  NAME: 'name',
  DOORS: 'doors',
  PAY: 'pay',
  RECEIVES: 'receives',
  COLOR: 'color',
  DIRECTIONS: 'directions',
};

export const STATUS = {
  CORRECT: 'correct', // Green
  PARTIAL: 'partial', // Yellow
  INCORRECT: 'incorrect', // Red
};

export function compareAttributes(guessValue, targetValue, attribute) {
  if (guessValue === targetValue) return STATUS.CORRECT;
  
  // Arrays (Pay, Receives, Directions)
  if (Array.isArray(guessValue) && Array.isArray(targetValue)) {
    // Sort to compare exact match for arrays if order doesn't matter
    const sortedGuess = [...guessValue].sort();
    const sortedTarget = [...targetValue].sort();
    if (JSON.stringify(sortedGuess) === JSON.stringify(sortedTarget)) {
      return STATUS.CORRECT;
    }

    // Check intersection
    const intersection = guessValue.filter(x => targetValue.includes(x));
    if (intersection.length > 0) {
      return STATUS.PARTIAL;
    }
    
    return STATUS.INCORRECT;
  }

  // Numbers (Doors)
  if (typeof guessValue === 'number' && typeof targetValue === 'number') {
      if (guessValue === targetValue) return STATUS.CORRECT;
      // Could add partial logic for numbers if needed, e.g. within range
      return STATUS.INCORRECT;
  }

  // Strings (Color)
  if (guessValue === targetValue) return STATUS.CORRECT;

  return STATUS.INCORRECT;
}

export function checkGuess(guessRoom, targetRoom) {
  return {
    room: guessRoom,
    results: {
      [ATTRIBUTES.DOORS]: compareAttributes(guessRoom.doors, targetRoom.doors, ATTRIBUTES.DOORS),
      [ATTRIBUTES.PAY]: compareAttributes(guessRoom.pay, targetRoom.pay, ATTRIBUTES.PAY),
      [ATTRIBUTES.RECEIVES]: compareAttributes(guessRoom.receives, targetRoom.receives, ATTRIBUTES.RECEIVES),
      [ATTRIBUTES.COLOR]: compareAttributes(guessRoom.color, targetRoom.color, ATTRIBUTES.COLOR),
      [ATTRIBUTES.DIRECTIONS]: compareAttributes(guessRoom.directions, targetRoom.directions, ATTRIBUTES.DIRECTIONS),
    }
  };
}
