
const roomImages = import.meta.glob('../assets/*_Icon.webp', { eager: true });

export const getRoomImage = (roomName) => {
  if (!roomName) return null;
  // Format room name to match filename convention
  // e.g. "Entrance Hall" -> "Entrance_Hall_Icon.webp"
  // "Lost & Found" -> "Lost_%26_Found_Icon.webp"
  let formattedName = roomName.replace(/ /g, '_');
  formattedName = formattedName.replace(/&/g, '%26'); // Handle ampersand if present
  
  const path = `../assets/${formattedName}_Icon.webp`;
  return roomImages[path]?.default || null;
};
