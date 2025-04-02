import { FLOORS, LAST_FLOOR_ROOMS, ROOMS_PER_FLOOR } from "../constants";

const generateInitialRooms = () => {
  let rooms = {};
  for (let floor = 1; floor <= FLOORS; floor++) {
    let numRooms = floor === 10 ? LAST_FLOOR_ROOMS : ROOMS_PER_FLOOR;
    rooms[floor] = Array(numRooms).fill(false); // false means available
  }
  return rooms;
};

const findOptimalRooms = (rooms, numRooms) => {
  let selectedRooms = [];

  // Checking if booking on same floor is available
  for (let floor = 1; floor <= FLOORS; floor++) {
    let availableRooms = rooms[floor]
      .map((occupied, index) => (!occupied ? index : null))
      .filter((index) => index !== null);
      console.log("availableRooms", availableRooms);
    if (availableRooms.length >= numRooms) {
      return availableRooms
        .slice(0, numRooms)
        .map((index) => ({ floor, index }));
    }
  }

  // Minimizing travel time to book room
  let booked = 0;
  for (let floor = 1; floor <= FLOORS; ++floor) {
    for (let index = 0; index < rooms[floor].length; ++index) {
      if (!rooms[floor][index]) {
        selectedRooms.push({ floor, index });
        ++booked;
        if (booked === parseInt(numRooms)) return selectedRooms;
      }
    }
  }
  return selectedRooms;
};

export {
    generateInitialRooms,
    findOptimalRooms,
}