import { FLOORS, LAST_FLOOR_ROOMS, ROOMS_PER_FLOOR } from "../constants";

const generateInitialRooms = () => {
  let rooms = {};
  for (let floor = 1; floor <= FLOORS; floor++) {
    let numRooms = floor === 10 ? LAST_FLOOR_ROOMS : ROOMS_PER_FLOOR;
    rooms[floor] = Array(numRooms).fill(false); // false means available
  }
  return rooms;
};

export {
    generateInitialRooms
}